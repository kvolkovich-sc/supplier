'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// See why and how /etc/hosts is populated with "dockerhost" in "wait-for-db" script.
const consul = require('consul')({ host: 'dockerhost' });

const NODE_ENV = process.env.NODE_ENV || 'development';
const DB_CONFIG_FILE = path.normalize(__dirname + '/../../../../db.config.json');
const DB_SERVICE_NAME = 'mysql';

function findModels(base, dir) {
  return fs.readdirSync(dir).reduce((list, file) => {
    let name = path.join(dir, file);
    let isDir = fs.statSync(name).isDirectory();
    let moduleName = file.replace(/\.[^/.]+$/, '');

    return list.concat(isDir ?
      findModels(base + moduleName + '/', name) :
      (moduleName === 'index' ? [] : [base + moduleName])
    );
  }, []);
}

function getDb(config) {
  console.log('\n-----------\nDB configuration\n', config, '\n-----------\n');

  let db = {
    Sequelize,
    config,
    sequelize: new Sequelize(config.database, config.username, config.password, config)
  }

  findModels('', __dirname).forEach((moduleName) => {
    let m = require(`./${moduleName}`)(db.sequelize);
    db[m.name] = m;

    db[m.name].beforeCreate(object => {
      if (!object.createdBy) {
        object.createdBy = 'jcadmin';  // eslint-disable-line no-param-reassign
      }

      if (!object.changedBy) {
        object.changedBy = 'jcadmin';  // eslint-disable-line no-param-reassign
      }
    });
  });

  Object.keys(db).forEach(modelName => db[modelName].associate && db[modelName].associate(db));

  // create database schema
  // migration should be run manually before application startup
  // db.sequelize.sync();

  return db;
}

let config;

try {
  // NOTE: config file has priority over env variables.
  config = require(DB_CONFIG_FILE)[NODE_ENV];
} catch (ignore) {
  // Config file is not found.
}

config = {
  username: config && config.username || process.env.DB_USER,
  password: config && config.password || process.env.DB_PASSWORD,
  database: config && config.database || process.env.DB_NAME,
  host: config && config.host || process.env.DB_HOST,
  port: config && config.port || process.env.DB_PORT,
  dialect: config && config.dialect || process.env.DB_DIALECT || 'mysql'
};

let consulPromises = [];

if (!config.host || !config.port) {
  consulPromises.push(new Promise((resolve, reject) => consul.catalog.service.nodes(DB_SERVICE_NAME, (err, result) => {
    if (err) {
      reject(err);
      return;
    }

    resolve({
      host: result && result[0] && result[0].ServiceAddress,
      port: result && result[0] && result[0].ServicePort
    });

    return;
  })));
}

if (!config.username || !config.password || !config.database) {
  consulPromises.push(new Promise((resolve, reject) => consul.kv.get({
    key: 'MYSQL_',
    recurse: true
  }, (err, result) => {
    if (err) {
      reject(err);
      return;
    }

    resolve((Array.isArray(result) && result || []).reduce((rez, kvPair) => {
      let param;

      switch (kvPair.Key) {
        case 'MYSQL_DATABASE':
          param = 'database';
          break;
        case 'MYSQL_PASSWORD':
          param = 'password';
          break;
        case 'MYSQL_USER':
          param = 'username';
          break;
        default:
          param = null;
      }

      return param ? {
        ...rez,
        [param]: rez[param] || kvPair.Value
      } : rez;
    }, {}));

    return;
  })));
}

let dbPromise = Promise.all(consulPromises).then(results => {
  results.forEach(result => Object.keys(result).forEach(param => {
    config[param] = config[param] || result[param];
  }));

  let notSpecified = Object.keys(config).filter(param => !config[param]);

  if (notSpecified.length) {
    return Promise.reject(`The following required params must be set in "${DB_CONFIG_FILE}", ENV vars or Consul: "` +
      notSpecified.join('", "') + '"');
  }

  return Promise.resolve(getDb(config));
});

export default dbPromise;

