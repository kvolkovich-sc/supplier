'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const Promise = require('bluebird');

const NODE_ENV = process.env.NODE_ENV || 'development';

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

function associateModels(db) {
  var promises = [];
  findModels('', __dirname).forEach(moduleName => {
    let m = require(`./${moduleName}`)(db);
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


  Object.keys(db).forEach(function (modelName) {
    db[modelName].associate && promises.push(db[modelName].associate(db));
  });

  return Promise.all(promises);
}

export default associateModels;
