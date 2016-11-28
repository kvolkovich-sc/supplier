let suppliers = require('./supplier.json');
let addresses = require('./address.json');
let supplier2addresses = require('./supplier2address.json');
let supplierContact = require('./supplierContact.json');

export default function(db) {
  let updateIfCreated = function(data, entity, created) {
    if (!created) {
      return entity.update(data, { fields: Object.keys(data) });
    }

    return entity;
  };

  suppliers.forEach(data => {
    db.Supplier.findOrCreate({
      where: {
        supplierId: data.supplierId
      },
      defaults: data
    }).spread(updateIfCreated.bind(this, data));
  });

  addresses.forEach(data => {
    db.Address.findOrCreate({
      where: {
        addressId: data.addressId
      },
      defaults: data
    }).spread(updateIfCreated.bind(this, data));
  });

  supplier2addresses.forEach(data => {
    db.Supplier2Address.findOrCreate({
      where: {
        addressId: data.addressId,
        supplierId: data.supplierId,
        type: data.type
      },
      defaults: data
    }).spread(updateIfCreated.bind(this, data));
  });

  supplierContact.forEach(data => {
    db.SupplierContact.findOrCreate({
      where: {
        contactId: data.contactId
      },
      defaults: data
    })
  });
}
