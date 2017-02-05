"use strict";
const Umzug = require('umzug');
const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');

const dbInit = require('ocbesbn-dbinit').init;
const dbConfigPromise = require('./dbConfigService');
const populateDemodata = require(`./../db/data`);

const MODELS_DIR = path.join(__dirname, '../db/models');
const MIGRATIONS_DIR = path.join(__dirname, '../db/migrations');

function getModulesNames(dir) {
  // The function returns all modulesNames in the specified dir.  The dir must not contain another dirs.
  // moduleName is a file name witout '.js' extension and other than 'index' =>
  // not js-files and 'index.js' are excluded from consideration.
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, list) => {
      if (err) {
        reject(err);
      }

      let modulesNames = [];

      for (let shortName of list) {
        let fullName = path.join(dir, shortName);

        if (fs.statSync(fullName).isDirectory()) {
          reject('Only files are allowed inside modules dir', fullName);
          break;
        }

        let moduleName = shortName.replace(/\.js$/, '');

        if (moduleName !== 'index' && moduleName.charAt(0) !== '.') {
          modulesNames.push(moduleName);
        }
      }

      resolve(modulesNames);
    })
  });
}

function registerModels(db) {
  return getModulesNames(MODELS_DIR).
    then(modelsNames => {
      let models = modelsNames.map(modelName => {
        let model = require(path.join(MODELS_DIR, modelName))(db.sequelize);

        model.beforeCreate(object => {
          if (!object.createdBy) {
            object.createdBy = 'jcadmin';  // eslint-disable-line no-param-reassign
          }

          if (!object.changedBy) {
            object.changedBy = 'jcadmin';  // eslint-disable-line no-param-reassign
          }
        });

        db[model.name] = model;  // eslint-disable-line no-param-reassign
        return model;
      });

      models.forEach(model => model.associate && model.associate(db));
      return db;
    });
}

function migrateDb(db) {
  return new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize: db.sequelize
    },
    logging: migration => {
      console.log(migration);
    },
    migrations: {
      params: [
        db.sequelize.getQueryInterface(),
        Sequelize
      ],
      path: 'src/server/db/migrations'
    }
  }).execute({
    migrations: getModulesNames(MIGRATIONS_DIR),
    method: 'up'
  }).then(() => db);
}

  /**
   * Implements flow that should be executed with database to be up'n'running
   * 1) get db credentianls from db.config.js/env/consul
   * 2) execute migrations
   * 3) register models
   * 4) populate demodata (if env.POPULATE_DATA == true)
   *
   * Returns a Promise that is resolved with db object that consists of
   * {
   *  sequelize: <sequalize instance>
   *  <models>
   * }
   */
let populateDB;

module.exports = dbConfigPromise.
  then(([config, populateDatabase]) => {
    populateDB = populateDatabase;
    return dbInit(configO);
  }).
  then(sequelize => migrateDb({ sequelize })).
  then(registerModels).
  then(db => populateDemodata(populateDB, db));

