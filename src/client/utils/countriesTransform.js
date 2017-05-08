export default function(countries) {
  let countriesList = [];
  Object.keys(countries).forEach(key => {
    const country_name = countries[key].name;
    if (country_name && country_name.length > 0) {
      countriesList.push({ id: countries[key].id, name: countries[key].name });
    }
  });

  return countriesList.sort((a, b) => a.name.localeCompare(b.name));
}
