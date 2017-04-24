const SupplierContact = require('../queries/supplier_contacts');

module.exports = function(app, db, config) {
  SupplierContact.init(db, config).then(() =>
  {
    app.get('/api/suppliers/:supplierId/contacts', (req, res) => sendSupplierContacts(req, res));
    app.get('/api/suppliers/:supplierId/contacts/:contactId', (req, res) => sendSupplierContact(req, res));
  });

  sendSupplierContacts = function(req, res)
  {
    SupplierContact.all(req.params.supplierId).then(contacts =>
    {
      res.json(contacts);
    });
  }

  sendSupplierContact = function(req, res)
  {
    SupplierContact.find(req.params.supplierId, req.params.contactId).then(contact =>
    {
      res.json(contact);
    });
  }
}
