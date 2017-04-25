const ServiceClient = require('ocbesbn-service-client');

module.exports = function(app) {
  var client = new ServiceClient({ consul : { host : 'consul' } });
  app.get('/api/countries', function(request, response) {
    client.get('isodata', '/countries').spread(countries => {
      response.json(Object.keys(countries).map(key => {
        return { countryId: countries[key].id, countryName: countries[key].name };
      }));
    });
  });

  app.get('/api/countries/:id', function(request, response) {
    client.get('isodata', '/countries/' + request.params.id).spread(country => {
      response.json({ countryId: country.id, countryName: country.name });
    });
  });
}
