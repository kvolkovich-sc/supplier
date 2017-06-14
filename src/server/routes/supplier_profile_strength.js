
module.exports = function(app, db, config) {
  app.get('/api/suppliers/:supplierId/profile_strength', (req, res) => res.json(46));
}
