'use strict';
const path = require('path');

const consulEmitter = require('./consulService.js').emitter;

const NODE_ENV = process.env.NODE_ENV || 'development';
const DB_CONFIG_FILE = path.normalize(__dirname + '/../../../../db.config.json');

function getMissingParams(dbConfig) {
  return Object.keys(dbConfig).filter(key => !dbConfig[key]);
}

/**
 * The module exports a Promise that is resolved with DB config object
 * {
 *   username: "<string>",
 *   password: "<string>",
 *   database: "<string>",
 *   host: "<string with host or ip address>",
 *   port: "<string>",
 *   dialect: "<string>"
 * }
 */
module.exports = new Promise((resolve, reject) => {
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

  let origMissingParams = getMissingParams(dbConfig);

  if (origMissingParams.length === 0) {
    resolve(dbConfig);
    return;
  }

  console.log('Waiting for the following params from Consul:', origMissingParams.join(', '), '...');

  consulEmitter.on('dbConfig', (action, details) => {
    let missingParams = getMissingParams(dbConfig);
    let neededParams = Object.keys(details).filter(param => missingParams.indexOf(param) !== -1);

    switch (action) {
      case 'add':
        neededParams.forEach(param => {
          dbConfig[param] = details[param];
        });

        if (getMissingParams(dbConfig).length === 0) {
          // A promise can be resolved only once => the function is called only after initial
          // filling of all missing params in dbConfig.
          console.log('\n--------------------\nDB configuration\n', dbConfig, '\n--------------------\n');
          resolve(dbConfig);
        }
        break;
      case 'delete':
        neededParams.forEach(param => {
          // config params from either env vars or cofig file should not be modified.
          if (origMissingParams.indexOf(param) !== -1) {
            dbConfig[param] = undefined;
          }
        });
        break;
      case 'update':
        neededParams.forEach(param => {
          // config params from either env vars or cofig file should not be modified.
          if (origMissingParams.indexOf(param) !== -1) {
            dbConfig[param] = details[param];
          }
        });
        break;
      case 'error':
        if (getMissingParams(dbConfig).length) {
          // A promise can be rejected only once => the function is called only when initial
          // filling of missing params in dbConfig receives an error.
          reject(details);
        }
        break;
      default:
        break;
    }
  });

  missingParams = getMissingParams(dbConfig);

  if (missingParams) {
    // A promise can be resolved only once => the function is called only after initial
    // filling of all missing params in dbConfig.
    console.log('Still waiting for the following params from Consul:', missingParams.join(', '), '...');
  }

  return;
});

