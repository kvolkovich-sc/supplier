const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');

const dbReadyPromise = require('./service/dbReadyService');
const registerRestRoutes = require('./routes');
// import "./logger";  // initialize logging

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
    stats: { colors: true },
    noInfo: true
  }));
}

// launch application
let server = app.listen(process.env.PORT, err => {
  if (err) {
    console.log(err);
  }

  console.info(
    'The server is running at http://%s:%s/',
    server.address().address === '::' ? '0.0.0.0' : server.address().address,
    server.address().port
  );
});

function gracefulShutdown(msg) {
  if (msg) {
    console.log('SERVER GRACEFUL SHUTDONW:', msg);
  }

  server.close(() => process.exit(0));
}

// listen for TERM signal .e.g. "kill" or "docker[-compose] stop" commands.
process.on('SIGTERM', gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);

dbReadyPromise.
  then(db => registerRestRoutes(app, db)).  // register rest api only after connecting to DB.
  catch(err => gracefulShutdown(err));

