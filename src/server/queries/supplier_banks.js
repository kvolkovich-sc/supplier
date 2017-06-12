'use strict';

const Promise = require('bluebird');

module.exports.init = function(db, config)
{
  this.db = db;

  return Promise.resolve(this);
};

module.exports.all = function(supplierId)
{
  return this.db.models.SupplierBankAccount.findAll({ where: { supplierId: supplierId } });
};

module.exports.find = function(supplierId, bankId)
{
  return this.db.models.SupplierBankAccount.findOne({ where: { supplierId: supplierId, bankId: bankId } });
};

module.exports.create = function(address)
{
  return this.db.models.SupplierBankAccount.create(address).then(address => {
    return address;
  });
};

module.exports.update = function(supplierId, bankId, address)
{
  let self = this;
  return this.db.models.SupplierBankAccount.update(address, { where: { bankId: bankId } }).then(() => {
    return self.find(supplierId, bankId);
  });
};

module.exports.delete = function(supplierId, bankId)
{
  return this.db.models.SupplierBankAccount.destroy({ where: { supplierId: supplierId, bankId: bankId } }).then(() => null);
};

module.exports.bankExists = function(supplierId, bankId)
{
  return this.find(supplierId, bankId).then(accounts => accounts && accounts.bankId === bankId);
};
