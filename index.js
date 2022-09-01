const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");
const _ = require("lodash");
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// GET requests
app.get("/", (req, res) => {

    res.sendFile(__dirname + "public/index.html");

});

// POST requests
app.post("/", (req, res) => {

    const city = _.capitalize(req.body.city);
    const units = "metric";
    const api = process.env.API_KEY;

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api + "&units=" + units;

    // GET req to OPENWEATHER.COM server.
    https.get(url, (response) => {
        response.on("data", (data) => {

            const Data = JSON.parse(data);
            const statusCode = Data.cod;
            if (statusCode === 200) {

                const weather = Data.weather[0].main;
                const description = Data.weather[0].description;
                const temp = Data.main.temp;
                const iconID = Data.weather[0].icon;

                res.render("report", { weather: weather, description: description, temp: temp, iconID: iconID, city: city });

            } else {
                console.log(Data.message);
                res.redirect(404, "/");

            }


        });
    });

});

app.listen(3000, () => {
    console.log("Server is up and runnig on port 3000");
});


// API key : <0u0>