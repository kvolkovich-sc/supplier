const SupplierContact = require('../queries/supplier_contacts');

module.exports = function(app, db, config) {
  SupplierContact.init(db, config).then(() =>
  {
    app.get('/api/suppliers/:supplierId/contacts', (req, res) => sendSupplierContacts(req, res));
    app.post('/api/suppliers/:supplierId/contacts', (req, res) => createSupplierContact(req, res));
    app.get('/api/suppliers/:supplierId/contacts/:contactId', (req, res) => sendSupplierContact(req, res));
    app.put('/api/suppliers/:supplierId/contacts/:contactId', (req, res) => updateSupplierContact(req, res));
    app.delete('/api/suppliers/:supplierId/contacts/:contactId', (req, res) => deleteSupplierContact(req, res));
  });
};

let sendSupplierContacts = function(req, res)
{
  SupplierContact.all(req.params.supplierId).then(contacts =>
  {
    res.json(contacts);
  });
};

let sendSupplierContact = function(req, res)
{
  SupplierContact.find(req.params.supplierId, req.params.contactId).then(contact =>
  {
    res.json(contact);
  });
};

let createSupplierContact = function(req, res)
{
  SupplierContact.create(req.body).then(contact => res.status('200').json(contact))
  .catch(e => res.status('400').json({ message : e.message }));
};

let updateSupplierContact = function(req, res)
{
  let contactId = req.params.contactId;
  let supplierId = req.params.supplierId;
  SupplierContact.contactExists(supplierId, contactId).then(exists =>
  {
    if(exists)
    {
      return SupplierContact.update(supplierId, contactId, req.body).then(contact => res.status('200').json(contact));
    } else {
      return res.status('404').json({ message : 'A supplier contact with this ID does not exist.' });
    }
  })
  .catch(e => res.status('400').json({ message : e.message }));
};

let deleteSupplierContact = function(req, res)
{
  SupplierContact.delete(req.params.supplierId, req.params.contactId).then(() => res.status('200').json(null))
  .catch(e => res.status('400').json({ message : e.message }));
};
