'use strict';

const Promise = require('bluebird');
const epilogue = require('epilogue');
const express = require('express');

const supplierRoutes = require('./supplier');
const supplierAddressRoutes = require('./supplierAddress');
const countries = require('./countries');
const Supplier = require('../api/suppliers');
const SupplierAddress = require('../api/supplier_addresses');
const SupplierContact = require('../api/supplier_contacts');

/**
 * Initializes all routes for RESTful access.
 *
 * @param {object} app - [Express]{@link https://github.com/expressjs/express} instance.
 * @param {object} db - If passed by the web server initialization, a [Sequelize]{@link https://github.com/sequelize/sequelize} instance.
 * @param {object} config - Everything from [config.routes]{@link https://github.com/OpusCapitaBusinessNetwork/web-init} passed when running the web server initialization.
 * @returns {Promise} [Promise]{@link http://bluebirdjs.com/docs/api-reference.html}
 * @see [Minimum setup]{@link https://github.com/OpusCapitaBusinessNetwork/web-init#minimum-setup}
 */
module.exports.init = function(app, db, config) {
  // Register routes here.
  // Use the passed db parameter in order to use Epilogue auto-routes.
  // Use require in order to separate routes into multiple js files.

  Supplier.init(db, config).then(() =>
  {
    app.get('/suppliers', (req, res) => this.sendSuppliers(req, res));
  });

  SupplierAddress.init(db, config).then(() =>
  {
    app.get('/suppliers/:supplierId/addresses', (req, res) => this.sendSupplierAddresses(req, res));
  });

  SupplierContact.init(db, config).then(() =>
  {
    app.get('/api/suppliers/:supplierId/contacts', (req, res) => this.sendSupplierContacts(req, res));
    app.get('/api/suppliers/:supplierId/contacts/:contactId', (req, res) => this.sendSupplierContact(req, res));
  });

  epilogue.initialize({
    app: app,
    sequelize: db,
    base: '/api'
  });

  // supplier routes
  supplierRoutes(epilogue, db);

  // supplier address routes
  supplierAddressRoutes(epilogue, db);

  // countries
  countries(epilogue, db);

  if (process.env.NODE_ENV === 'development') {
    const path = require('path');
    const exphbs = require('express-handlebars');

    app.use('/static', express.static(path.join(__dirname, '../static')));

    app.engine('handlebars', exphbs());
    app.set('view engine', 'handlebars');
    app.set('views', path.resolve(__dirname + '/../templates'));

    app.get('/', (req, res) => {
      res.render('index', {
        helpers: {
          json: JSON.stringify
        }
      });
    });
  }

  // Always return a promise.
  return Promise.resolve();
}

module.exports.sendSuppliers = function(req, res)
{
  Supplier.all().then(suppliers =>
  {
    res.json(suppliers);
  });
}

module.exports.sendSupplierAddresses = function(req, res)
{
  SupplierAddress.all(req.params.supplierId).then(addresses =>
  {
    res.json(addresses);
  });
}

module.exports.sendSupplierContacts = function(req, res)
{
  SupplierContact.all(req.params.supplierId).then(contacts =>
  {
    res.json(contacts);
  });
}

module.exports.sendSupplierContact = function(req, res)
{
  SupplierContact.find(req.params.supplierId, req.params.contactId).then(contact =>
  {
    res.json(contact);
  });
}
