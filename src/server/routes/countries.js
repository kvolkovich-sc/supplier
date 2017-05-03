module.exports = function(app) {
  app.get('/api/countries', function(req, res) {
    req.ocbesbn.serviceClient.get('isodata', '/countries').spread(countries => {
      let countriesList = [];
      Object.keys(countries).forEach(key => {
        const country_name = countries[key].name;
        if (country_name && country_name.length > 0) {
          countriesList.push({ id: countries[key].id, name: countries[key].name });
        }
      });
      res.json(countriesList);
    });
  });

  app.get('/api/countries/:id', function(req, res) {
    req.ocbesbn.serviceClient.get('isodata', '/countries/' + req.params.id).spread(country => {
      res.json({ id: country.id, name: country.name })
    });
  });
}
