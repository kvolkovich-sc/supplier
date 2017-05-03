const server = require('ocbesbn-web-init'); // Web server
const db = require('ocbesbn-db-init'); // Database

const developmentServerConfig = (db) => ({
  server: {
    webpack: {
      useWebpack: true,
      configFilePath: __dirname + '/../../webpack.development.config.js'
    }
  },
  routes: {
    dbInstance: db
  },
  serviceClient : {
    injectIntoRequest : true,
    consul : {
      host : 'consul'
    }
  }
});

const productionServerConfig = (db) => ({
  server: {
    staticFilePath: __dirname + '/static'
  },
  routes: {
    dbInstance: db
  },
  serviceClient : {
    injectIntoRequest : true,
    consul : {
      host : 'consul'
    }
  }
});

const getServerConfig = (db) => process.env.NODE_ENV === 'development' ? developmentServerConfig(db) : productionServerConfig(db);

if (process.env.NODE_ENV !== 'test') {
  /* launch aplication */
  db.init({ consul : { host : 'consul' }, retryCount: 50 })
    .then((db) => server.init(getServerConfig(db)))
    .catch((e) => { server.end(); throw e; });
}
