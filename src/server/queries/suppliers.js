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

module.exports.create = function(supplier)
{
  return this.db.models.Supplier.create(supplier).then(supplier => {
    return supplier;
  });
}

module.exports.update = function(supplierId, supplier)
{
  var self = this;
  return this.db.models.Supplier.update(supplier, { where: { supplierId: supplierId } }).then(() => {
    return self.find(supplierId);
  });
}

module.exports.exists = function(supplierId)
{
  return this.db.models.Supplier.findById(supplierId).then(supplier => supplier && supplier.supplierId === supplierId);
}

module.exports.recordExists = function(supplier)
{
  var options = { supplierName: supplier.supplierName };

  var fields = ['registrationNumber', 'taxId', 'vatRegNo'];

  for (var i = 0; i < fields.length; i++) {
    if (supplier[fields[i]]) {
      options[fields[i]] = supplier[fields[i]]
    }
  }

  return this.db.models.Supplier.findOne({ where: options }).then(sup => sup ? true : false);
}

module.exports.isAuthorized = function(supplierId, changedBy)
{
  return this.find(supplierId).then(supplier => {
    return supplier && supplier.getDataValue('changedBy') === changedBy;
  });
}
