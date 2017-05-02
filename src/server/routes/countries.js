const ServiceClient = require('ocbesbn-service-client');

module.exports = function(app) {
  var client = new ServiceClient({ consul : { host : 'consul' } });
  app.get('/api/countries', function(request, response) {
    client.get('isodata', '/countries').spread(countries => {
      let countriesList = [];
      Object.keys(countries).forEach(key => {
        const country_name = countries[key].name;
        if (country_name && country_name.length > 0) {
          countriesList.push({ id: countries[key].id, name: countries[key].name });
        }
      });
      response.json(countriesList);
    });
  });

  app.get('/api/countries/:id', function(request, response) {
    client.get('isodata', '/countries/' + request.params.id).spread(country => {
      response.json({ id: country.id, name: country.name })
    });
  });
}
