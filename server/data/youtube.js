/*
  youtube.js

  this searches youtube for videos
*/
require('../../config/config');
const YouTube = require('simple-youtube-api');
var youtubeKey = process.env.YOUTUBE_KEY;
const youtube = new YouTube(youtubeKey);

class youtubeVideo{
  constructor(){
    this.videodata = [];
  };

searchYoutube(search){
  //console.log('The key is',youtubeKey)
  return youtube.searchVideos(search, 4).then().catch(console.log);

  };
};

module.exports = {youtubeVideo}
