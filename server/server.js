/*
  server.js

  This will be the start of the system not sure what it will do yet
*/

const express = require("express");

const {weatherData, weatherDataDaily} = require('./data/weather');
const {geocodeAddress} = require('./data/geocode')


const app = express();
const path = require('path');
const port = process.env.PORT ||  3000;
var publicPath = path.join(__dirname, "../public");

console.log(port);

app.use(express.static(publicPath));

//weatherDataDaily(51.439770599999996,-3.1815661);

geocodeAddress('13 Fairfield road, Penarth, CF642SN').then((theLocation) => {
    console.log(theLocation);
    weatherDataDaily(theLocation.lat,theLocation.long).then((theweather) =>{
      console.log(theweather);
    });
  });

 app.get('/location/:address', (req,res) =>{
   var address = req.params.address;
   geocodeAddress(address).then((location) => {
     res.send(location);
   });
 });

 app.get('/weather/:lat/:long', (req,res) => {
   var lats = req.params.lat;
   var long = req.params.long;

   weatherDataDaily(lats,long).then((weather) => {
     res.send(weather);
   });
 });





app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
