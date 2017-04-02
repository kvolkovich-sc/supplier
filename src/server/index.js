const server = require('ocbesbn-web-init'); // Web server
const db = require('ocbesbn-db-init'); // Database
const network = require('network'); // Database

const developmentServerConfig = (db) => ({
  server: {
    webpack: {
      useWebpack: true,
      configFilePath: __dirname + '/../../webpack.production.config.js'
    }
  },
  routes: {
    dbInstance: db
  }
});

const productionServerConfig = (db) => ({
  server: {
    staticFilePath: __dirname + '/static'
  },
  routes: {
    dbInstance: db
  }
});

const getServerConfig = (db) => process.env.NODE_ENV === 'development' ? developmentServerConfig(db) : productionServerConfig(db);

function getConsulAddress(callback) {
  if (process.env.CONSUL_HOST) {
    callback(process.env.CONSUL_HOST);
  } else {
    network.get_gateway_ip(function(err, ip) {
      if (err) {
        console.log('warn: Gateway IP not found');
        callback('consul');
      } else {
        callback(ip);
      }
    })
  }
}

if (process.env.NODE_ENV !== 'test') {
  /* launch aplication */
  getConsulAddress(function(address) {
    db.init({ consul : { host : address }, retryCount: 50 })
      .then((db) => server.init(getServerConfig(db)))
      .catch((e) => { server.end(); throw e; });
  })
}
