const express = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const hbs = require("hbs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "CloudWatch",
    name: "M. Bilal Nadeem",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    aboutText:
      "Hi! I’m M. Bilal Nadeem, a passionate Software Engineer currently pursuing my studies in the Department of Computer Science at UBIT.",
    aboutText2: ' I specialize in building innovative and efficient solutions using cutting-edge technologies.',
    title: "About Me",
    name: "M. Bilal Nadeem",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText:
      "Welcome to the Help Center at CloudWatch! Our goal is to make your experience as smooth and seamless as possible.",
    title: "Help Center",
    name: "M. Bilal Nadeem",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error }); // Return the error to the user
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error }); // Return the error to the user
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Bilal Nadeem",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Bilal Nadeem",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
