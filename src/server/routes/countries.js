module.exports = function(epilogue, db) {
  epilogue.resource({
    model: db.Country,
    endpoints: ['/countries', '/countries/:id'],
    actions: ['list']
  });
}

