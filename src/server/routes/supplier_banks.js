const SupplierBank = require('../queries/supplier_addresses');

module.exports = function (app, db, config) {
  SupplierBank.init(db, config).then(() => {
    app.get('/api/suppliers/:supplierId/banks', (req, res) => sendSupplierBanks(req, res));
    app.post('/api/suppliers/:supplierId/banks', (req, res) => createSupplierBank(req, res));
    app.get('/api/suppliers/:supplierId/banks/:bankId', (req, res) => sendSupplierBank(req, res));
    app.put('/api/suppliers/:supplierId/banks/:banksId', (req, res) => updateSupplierBank(req, res));
    app.delete('/api/suppliers/:supplierId/banks/:banksId', (req, res) => deleteSupplierBank(req, res));
  });
};

let sendSupplierBanks = function (req, res) {
  SupplierBank.all(req.params.supplierId).then(addresses => {
    res.json(addresses);
  });
};

let sendSupplierBank = function (req, res) {
  SupplierBank.find(req.params.supplierId, req.params.addressId).then(address => {
    res.json(address);
  });
};

let createSupplierBank = function (req, res) {
  SupplierBank.create(req.body).then(address => res.status('200').json(address))
    .catch(e => res.status('400').json({message: e.message}));
};

let updateSupplierBank = function (req, res) {
  let addressId = req.params.addressId;
  let supplierId = req.params.supplierId;
  SupplierBank.addressExists(supplierId, addressId).then(exists => {
    if (exists) {
      return SupplierBank.update(supplierId, addressId, req.body).then(address => res.status('200').json(address));
    } else {
      return res.status('404').json({message: 'A supplier address with this ID does not exist.'});
    }
  })
    .catch(e => res.status('400').json({message: e.message}));
};

let deleteSupplierBank = function (req, res) {
  SupplierBank.delete(req.params.supplierId, req.params.addressId).then(() => res.status('200').json(null))
    .catch(e => res.status('400').json({message: e.message}));
};
