const SupplierAddress = require('../queries/supplier_addresses');

module.exports = function(app, db, config) {
SupplierAddress.init(db, config).then(() =>
  {
    app.get('/api/suppliers/:supplierId/addresses', (req, res) => sendSupplierAddresses(req, res));
    app.post('/api/suppliers/:supplierId/addresses', (req, res) => createSupplierAddress(req, res));
    app.get('/api/suppliers/:supplierId/addresses/:addressId', (req, res) => sendSupplierAddress(req, res));
    app.put('/api/suppliers/:supplierId/addresses/:addressId', (req, res) => updateSupplierAddress(req, res));
    app.delete('/api/suppliers/:supplierId/addresses/:addressId', (req, res) => deleteSupplierAddress(req, res));
  });
};

let sendSupplierAddresses = function(req, res)
{
  SupplierAddress.all(req.params.supplierId).then(addresses =>
  {
    res.json(addresses);
  });
};

let sendSupplierAddress = function(req, res)
{
  SupplierAddress.find(req.params.supplierId, req.params.addressId).then(address =>
  {
    res.json(address);
  });
};

let createSupplierAddress = function(req, res)
{
  SupplierAddress.create(req.body).then(address => res.status('200').json(address))
  .catch(e => res.status('400').json({ message : e.message }));
};

let updateSupplierAddress = function(req, res)
{
  let addressId = req.params.addressId;
  let supplierId = req.params.supplierId;
  SupplierAddress.addressExists(supplierId, addressId).then(exists =>
  {
    if(exists)
    {
      return SupplierAddress.update(supplierId, addressId, req.body).then(address => res.status('200').json(address));
    } else {
      return res.status('404').json({ message : 'A supplier address with this ID does not exist.' });
    }
  })
  .catch(e => res.status('400').json({ message : e.message }));
};

let deleteSupplierAddress = function(req, res)
{
  SupplierAddress.delete(req.params.supplierId, req.params.addressId).then(() => res.status('200').json(null))
  .catch(e => res.status('400').json({ message : e.message }));
};
