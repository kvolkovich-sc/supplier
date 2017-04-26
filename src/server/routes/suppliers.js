const Supplier = require('../queries/suppliers');

module.exports = function(app, db, config) {
  Supplier.init(db, config).then(() =>
  {
    app.get('/api/suppliers', (req, res) => sendSuppliers(req, res));
    app.post('/api/suppliers', (req, res) => createSuppliers(req, res));
    app.get('/api/suppliers/:supplierId', (req, res) => sendSupplier(req, res));
    app.put('/api/suppliers/:supplierId', (req, res) => updateSupplier(req, res));
  });
}

var sendSuppliers = function(req, res)
{
  Supplier.all().then(suppliers =>
  {
    res.json(suppliers);
  });
}

var createSuppliers = function(req, res)
{
  Supplier.recordExists(req.body).then(exists =>
  {
    if(exists) {
      return res.status('409').json({ message : 'A supplier already exists' });
    } else {
      Supplier.create(req.body).then(supplier => res.status('200').json(supplier));
    }
  })
  .catch(e => res.status('400').json({ message : e.message }));
}

var sendSupplier = function(req, res)
{
  Supplier.find(req.params.supplierId).then(suppliers =>
  {
    res.json(suppliers);
  });
}

var updateSupplier = function(req, res)
{
  let supplierId = req.params.supplierId;

  if (supplierId !== req.body.supplierId || !req.body.createdBy) {
    return res.status('422').json({ message: 'inconsistent data' });
  }

  if (!Supplier.isAuthorized(supplierId, req.body.changedBy)) {
    return res.status('403').json({ message: 'operation is not authorized' });
  }

  Supplier.exists(supplierId).then(exists =>
  {
    if(exists) {
      return Supplier.update(supplierId, req.body).then(supplier => res.status('200').json(supplier));
    } else {
      return res.status('404').json({ message : 'A supplier with this ID does not exist.' });
    }
  })
  .catch(e => res.status('400').json({ message : e.message }));
}
