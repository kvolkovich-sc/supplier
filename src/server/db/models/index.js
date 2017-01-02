'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

//TODO: See why and how /etc/hosts is populated with "dockerhost" in "startup-script".
const consul = require('consul')({ host: 'dockerhost' });
const config = require('ocbesbn-config'); 
// /const configconnection = new consulconfig

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
      (moduleName === 'index' || moduleName.charAt(0) === '.' ? [] : [base + moduleName])
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

  findModels('', __dirname).forEach(moduleName => {
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

let dbConfig;

try {
  // NOTE: config file has priority over env variables.
  dbConfig = require(DB_CONFIG_FILE)[NODE_ENV];
} catch (ignore) {
  // Config file is not found.
}

dbConfig = {
  username: dbConfig && dbConfig.username || process.env.DB_USER,
  password: dbConfig && dbConfig.password || process.env.DB_PASSWORD,
  database: dbConfig && dbConfig.database || process.env.DB_NAME,
  host: dbConfig && dbConfig.host || process.env.DB_HOST,
  port: dbConfig && dbConfig.port || process.env.DB_PORT,
  dialect: dbConfig && dbConfig.dialect || process.env.DB_DIALECT || 'mysql'
};

let consulPromises = [];

if (!dbConfig.host || !dbConfig.port) {
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

if (!dbConfig.username || !dbConfig.password || !dbConfig.database) {
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

let dbPromise = function () {};/*
Promise.all(consulPromises).then(results => {
  results.forEach(result => Object.keys(result).forEach(param => {
    dbConfig[param] = dbConfig[param] || result[param];
  }));

  let notSpecified = Object.keys(dbConfig).filter(param => !dbConfig[param]);

  if (notSpecified.length) {
    return Promise.reject(`The following required params must be set in "${DB_CONFIG_FILE}", ENV vars or Consul: "` +
      notSpecified.join('", "') + '"');
  }

  return Promise.resolve(getDb(dbConfig));
});
*/

export default dbPromise;

