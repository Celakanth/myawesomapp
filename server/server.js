/*
  server.js

  This will be the start of the system not sure what it will do yet
*/

require('../config/config')

const express = require("express");
var session = require('express-session');

const {weatherData, weatherDataDaily, WeatherStructure} = require('./data/weather');
const {geocodeAddress, getcityName} = require('./data/geocode');
const {searchImage} = require('./data/search');
const {youtubeVideo} = require('./data/youtube');
const {getNews} = require('./data/news');



const app = express();
const path = require('path');
const port = process.env.PORT ||  3000;
var publicPath = path.join(__dirname, "../public");

app.use(session({
  secret:'XASDASDA',
  proxy: true,
  resave: true,
  saveUninitialized: true
}));


var requireHTTPS = (req, res, next) => {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
};
//app.use(requireHTTPS);
app.use(express.static(publicPath));

//weatherDataDaily(51.439770599999996,-3.1815661);

// geocodeAddress('13 Fairfield road, Penarth, CF642SN').then((theLocation) => {
//     console.log(theLocation);
//     weatherDataDaily(theLocation.lat,theLocation.long).then((theweather) =>{
//       console.log(theweather);
//     });
//   });

 app.get('/location/:address', (req,res) =>{
   var address = req.params.address;
   ssn = req.session;

   ssn.address = req.params.address;
   geocodeAddress(address).then((location) => {
     res.send(location);
   });
 });

 app.get('/weather/:lat/:long', (req,res) => {
   var lats = req.params.lat;
   var long = req.params.long;

   const WeatherDatas = new WeatherStructure;



   ssn = req.session;
   ssn.lasObject = {
     lat: req.params.lat,
     lng: req.params.long
   }

   weatherDataDaily(lats, long).then((weather) => {
     WeatherDatas = new mongoose
     res.send(weather);
   });
 });

 app.get('/image/:search', (req,res) => {
   var search = req.params.search;
   searchImage(search).then((searchres) => {
     res.send(searchres);
   });
 });

 app.get('/townName/:lats/:long', (req,res) => {
   var lats = req.params.lats;
   var longs = req.params.long;
   getcityName(lats,longs).then((cityResponce) =>{
     res.send(cityResponce);
   })
 });

 app.get('/youtube/:search', (req,res) => {
   var search = req.params.search;
   var videos = [];
   var searchData = new youtubeVideo();
   searchData.searchYoutube(search).then((videoResults) => {
     videoResults.forEach((item) => {
       var itemData = {
         id: item.raw.id.videoId,
         title: item.raw.snippet.title,
         description: item.raw.snippet.description,
         thumbnail: item.raw.snippet.thumbnails.default.url,
         videoUrl: `https://www.youtube.com/watch?v=${item.raw.id.videoId}`
       }
       videos.push(itemData);
     })
      res.send(videos);
   });


 });

 app.get('/news/:town', (req,res) => {
   var search = req.params.town;
   getNews(search).then((theNews) => {
    res.send(theNews);
   }).catch((err) => {
     console.log(err)
   });
   
 })

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
