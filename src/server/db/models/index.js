'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const NODE_ENV = process.env.NODE_ENV || 'development';
const DB_CONFIG_FILE = path.normalize(__dirname + '/../../../../db.config.json');

let config = {};

try {
  // NOTE: config file has priority over env variables.
  config = require(DB_CONFIG_FILE)[NODE_ENV];
} catch (err) {
  if (
    ! process.env.RDS_USERNAME ||
    ! process.env.RDS_PASSWORD ||
    ! process.env.RDS_DB_NAME ||
    ! process.env.RDS_HOSTNAME ||
    ! process.env.RDS_PORT ||
    ! process.env.RDS_DIALECT
  ) {
    throw new Error(`DB configuration file "${DB_CONFIG_FILE}" is not found or can't be read.` +
      ' Use db.config.json.sample file as a boilerplate for your own config.');
  }

  config = {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    dialect: process.env.RDS_DIALECT
  };
}

console.log('\n-----------\nDB configuration\n', config, '\n-----------\n');

let db = {
  Sequelize,
  config,
  sequelize: new Sequelize(config.database, config.username, config.password, config)
}

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

findModels('', __dirname).forEach((moduleName) => {
  let m = require(`./${moduleName}`)(db.sequelize);
  db[m.name] = m;

  // temporary save fixed user name into changedOn and changedBy fields
  // console.log('Ading beforeCreate hook to ' + m.name + ' model');
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

export default db;
