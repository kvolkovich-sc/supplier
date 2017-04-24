'use strict'

const Promise = require('bluebird');

module.exports.init = function(db, config)
{
  this.db = db;

  return Promise.resolve(this);
}

module.exports.all = function(supplierId)
{
  return this.db.models.Supplier2Address.findAll({
    include: {
      model: this.db.models.Address,
      as: "address"
    },
    where: {
      supplierId: supplierId
    }
  });
}
