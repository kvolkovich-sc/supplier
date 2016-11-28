import epilogue from 'epilogue';

import supplierRoutes from './supplier';
import supplierAddressRoutes from './supplierAddress';
import supplierContactRoutes from './supplierContact';
import countries from './countries';

// app - express application
// db - sequilize models, sequilize instance, Sequlize class, config
export default function(app, db) {
  epilogue.initialize({
    app: app,
    sequelize: db.sequelize,
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
