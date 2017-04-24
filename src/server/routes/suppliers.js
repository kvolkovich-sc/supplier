const Supplier = require('../queries/suppliers');

module.exports = function(app, db, config) {
  Supplier.init(db, config).then(() =>
  {
    app.get('/suppliers', (req, res) => sendSuppliers(req, res));
    app.get('/suppliers/:supplierId', (req, res) => sendSupplier(req, res));
  });

  sendSuppliers = function(req, res)
  {
    Supplier.all().then(suppliers =>
    {
      res.json(suppliers);
    });
  }

  sendSupplier = function(req, res)
  {
    Supplier.find(req.params.supplierId).then(suppliers =>
    {
      res.json(suppliers);
    });
  }
}
