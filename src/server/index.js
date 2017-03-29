import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import Promise from "bluebird";
import db from "ocbesbn-dbinit";
import config from "ocbesbn-config";


const WEBPACK_DEV_CONFIG = '../../webpack.development.config.js';

// create express app
const app = express();

if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev', {
		stream: {
			write: console.log
		}
	}));
}
app.use(helmet());
// enable cross origin requests
app.use(function(req, res, next) {
	// only specific/trusted hosts have to be configured
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
	app.use('/static', express.static(__dirname + '/../../build/client'));
} else {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const compiler = webpack(require(WEBPACK_DEV_CONFIG));

  app.use(webpackMiddleware(compiler, {
    publicPath: '/static',
    stats: { colors: true, chunks: false },
    noInfo: true
  }));
}

//launch aplication
var server;
console.log("Initializing Consul connection.");
config.init({ host: 'consul' })
	.tap(function() {console.log("Consul connection initialized!")})
	.then(function (config) {
		return Promise.props({
      database: config.get("mysql/database"),
      username: config.get("mysql/username"),
      password: config.get("mysql/password"),
			_service: config.getEndPoint("mysql")
		});
	})
	.then(function (credentials) {
		console.log("Initializing Database connection.");
		credentials.host = credentials._service.host;
		credentials.port = credentials._service.port;

    if (process.env.NODE_ENV !== 'production') {
      credentials.username = credentials.username || "root";
      credentials.password = credentials.password || process.env.MYSQL_ROOT_PASSWORD;
      credentials.database = credentials.database || process.env.MYSQL_DATABASE;
    }

		return db.init(credentials);
	})
	.tap(function() {console.log("DB connection initialized!")})
  .then(function () {
    console.log("Migrating Database.");
    return db.migrate(`./src/server/db/migrations`);
  })
  .tap(function() {console.log("DB migrated!")})
  .then(db => {
		console.log("Preparing models.")
		require(`./db/models`).default(db.getConnection());  // prepare models
		return db;
	})
	.then(db => {
		console.log("Populating data.")
		require(`./db/data`).default(db.getConnection());  // populate data
		console.log("Registering routes.")
		require('./routes').default(app, db.getConnection());  // register rest api for DB specific models
	})
	.then(function () {
		server = app.listen(process.env.PORT || 3001, err => {
			if (err) {
				console.log(err);
			}

			console.info(
				'The server is running at http://%s:%s/',
				server.address().address === '::' ? '0.0.0.0' : server.address().address,
				server.address().port
			);
		});
	}).catch(gracefulShutdown);

  function gracefulShutdown(msg) {
    if (msg) {
      console.log('SERVER GRACEFUL SHUTDONW:', msg);
    }

	server && server.close(() => process.exit(0));
}

  // listen for TERM signal .e.g. "kill" or "docker[-compose] stop" commands.
  process.on('SIGTERM', gracefulShutdown.bind(null, server));

  // listen for INT signal e.g. Ctrl-C
  process.on('SIGINT', gracefulShutdown.bind(null, server));
