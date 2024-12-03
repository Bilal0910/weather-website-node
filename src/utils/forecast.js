const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.weatherstack.com/current?access_key=131235c2ac0c4e0adc150ed78306a5a7&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (body.error) {
      callback("Unable to fetch weather. Please check your inputs.", undefined);
    } else if (!body.current || !body.location) {
      callback("Incomplete data received from the API.", undefined);
    } else {
      callback(
        undefined,
        `It is currently ${body.current.temperature}°C with a wind speed of ${body.current.wind_speed} km/h. The weather condition is ${body.current.weather_descriptions[0]}.`
      );
    }
  });
};

module.exports = forecast;
