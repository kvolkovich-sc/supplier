const Promise = require('bluebird');

module.exports.init = function(db, config)
{
  this.db = db;
  return Promise.resolve(this);
};

module.exports.all = function(supplierId)
{
  return this.db.models.SupplierAddress.findAll({ where: { supplierId: supplierId } });
};

module.exports.find = function(supplierId, bankId)
{
  return this.db.models.SupplierAddress.findOne({ where: { supplierId: supplierId, bankId: bankId } });
};

module.exports.create = function(accounts)
{
  return this.db.models.SupplierAddress.create(accounts).then(accounts => {
    return accounts;
  });
};

module.exports.update = function(supplierId, bankId, accounts)
{
  let self = this;
  return this.db.models.SupplierAddress.update(accounts, { where: { bankId: bankId } }).then(() => {
    return self.find(supplierId, bankId);
  });
};

module.exports.delete = function(supplierId, bankId)
{
  return this.db.models.SupplierAddress.destroy({ where: { supplierId: supplierId, bankId: bankId } }).then(() => null);
};

module.exports.bankExists = function(supplierId, bankId)
{
  return this.find(supplierId, bankId).then(accounts => accounts && accounts.bankId === bankId);
};
