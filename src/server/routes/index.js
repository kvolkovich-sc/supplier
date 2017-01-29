const epilogue = require('epilogue');

const supplierRoutes = require('./supplier');
const supplierAddressRoutes = require('./supplierAddress');
const supplierContactRoutes = require('./supplierContact');
const countries = require('./countries');

// app - express application
// db - sequilize models, sequilize instance, Sequlize class, config
export default function(app, db) {
  epilogue.initialize({
    app: app,
    sequelize: db,
    base: '/api'
  });

  // supplier routes
  supplierRoutes(epilogue, db);

  // supplier address routes
  supplierAddressRoutes(epilogue, db);

  // supplier contacts
  supplierContactRoutes(epilogue, db);

  // countries
  countries(epilogue, db);
}
