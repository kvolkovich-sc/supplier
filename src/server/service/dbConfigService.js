'use strict';
const path = require('path');
const ocbesbnConfig = require('ocbesbn-config');
const commonLib = require('./lib');

const NODE_ENV = process.env.NODE_ENV || 'development';
const DB_CONFIG_FILE = path.normalize(__dirname + '/../../../../db.config.json');

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

let dbConfig;

try {
  // NOTE: config file has priority over env variables.
  dbConfig = require(DB_CONFIG_FILE)[NODE_ENV];
} catch (ignore) {
  // Config file is not found.
}

const populateDatabase = dbConfig && dbConfig.populateDatabase || process.env.DB_POPULATE || 'demo';

dbConfig = {
  database: dbConfig && dbConfig.database || process.env.DB_NAME,
  username: dbConfig && dbConfig.username || process.env.DB_USER,
  password: dbConfig && dbConfig.password || process.env.DB_PASSWORD,
  host: dbConfig && dbConfig.host || process.env.DB_HOST,
  port: dbConfig && dbConfig.port || process.env.DB_PORT,
  dialect: dbConfig && dbConfig.dialect || process.env.DB_DIALECT || 'mysql'
};

let missingParams = Object.keys(dbConfig).filter(key => !dbConfig[key]);

module.exports = missingParams.length ?
  ocbesbnConfig.init({ host: 'consul' }).
    catch(() => commonLib.getGatewayIp().then(gateway => ocbesbnConfig.init({ host: gateway }))).
    then(consul => Promise.all([
      commonLib.retriedPromise(() => consul.get("MYSQL_DATABASE")),
      commonLib.retriedPromise(() => consul.get("MYSQL_USER")),
      commonLib.retriedPromise(() => consul.get("MYSQL_PASSWORD")),
      commonLib.retriedPromise(() => consul.getEndPoint("mysql"))
    ])).
    then(([database, username, password, { host, port }]) => ([
      {
        ...dbConfig,
        database: dbConfig.database || database,
        username: dbConfig.username || username,
        password: dbConfig.password || password,
        host: dbConfig.host || host,
        port: dbConfig.port || port
      },
      populateDatabase
    ])) :
  Promise.resolve([dbConfig, populateDatabase]);

