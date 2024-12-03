const request = require("postman-request");
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
    address
  )}&access_token=pk.eyJ1IjoiYmlsYWwwOTEwIiwiYSI6ImNtNDc3YTlqNDAyaGgybHNkOXQ4YmlhY2UifQ.y4K2gq8BcoIv4q3jEBmNuw`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (!body.features || body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      const data = {
        longitude: body.features[0].properties.coordinates.longitude,
        latitude: body.features[0].properties.coordinates.latitude,
        location: body.features[0].properties.place_formatted,
      };
      callback(undefined, data);
    }
  });
};

module.exports = geocode;
