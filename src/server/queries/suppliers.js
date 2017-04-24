'use strict'

const Promise = require('bluebird');

module.exports.init = function(db, config)
{
  this.db = db;

  return Promise.resolve(this);
}

module.exports.all = function()
{
  return this.db.models.Supplier.findAll();
}

module.exports.find = function(supplierId)
{
  return this.db.models.Supplier.findById(supplierId);
}
