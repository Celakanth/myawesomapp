/*
  server.js

  This will be the start of the system not sure what it will do yet
*/

require('../config/config')
const fs = require('fs')
const https = require('https')

const express = require("express");
var session = require('express-session');

const {weatherData, weatherDataDaily, weatherHourly} = require('./data/weather');
const {geocodeAddress, getcityName} = require('./data/geocode');
const {searchImage} = require('./data/search');
const {youtubeVideo} = require('./data/youtube');
const {getNews} = require('./data/news');



const app = express();
const path = require('path');
const port = process.env.PORT ||  3000;
var publicPath = path.join(__dirname, "../public");

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
   geocodeAddress(address).then((location) => {
     res.send(location);
   });
 });

 app.get('/weather/:lat/:long', (req,res) => {
   var lats = req.params.lat;
   var long = req.params.long;

   weatherDataDaily(lats, long).then((weather) => {
     res.send(weather);
   });
 });

 app.get('/weatherHourly/:lat/:long', (req,res) => {
  var lats = req.params.lat;
  var long = req.params.long;
  weatherHourly(lats, long).then((hourlyWeather) => {
    res.send(hourlyWeather);
  })


 })


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
     console.log(videoResults)
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
 try{
  https.createServer({
   key: fs.readFileSync('celakanth.key'),
    cert: fs.readFileSync('celakanth.cert')
  }, app).listen(port, () => {
    console.log(`Server is running https on ${port}`);
  });
 }
 catch(err)
 {
  app.listen(port, () => {
    console.log(`Server is running http on ${port}`);
  });
 }
 
 
