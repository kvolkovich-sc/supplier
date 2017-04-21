'use strict'

const Promise = require('bluebird');

module.exports.init = function(db, config)
{
  this.db = db;

  return Promise.resolve(this);
}

module.exports.all = function(supplierId)
{
  return this.db.models.SupplierContact.findAll({ where: { supplierId: supplierId } });
}

module.exports.find = function(supplierId, contactId)
{
  return this.db.models.SupplierContact.findOne({
    where: { supplierId: supplierId, contactId: contactId }
  });
}
