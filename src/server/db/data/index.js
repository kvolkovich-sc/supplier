module.exports = function(populateDatabase, db) {
  if (!populateDatabase) {
    return db;
  }

  console.log(`Populate database: "${populateDatabase}"`);

  switch (populateDatabase) {
    case 'demo':
      require('./demo')(db);
      break;
    case 'system':
      break;
    default:
      throw new Error('Unknown value of "populateDatabase" param:', populateDatabase);
  }

  return db;
}

