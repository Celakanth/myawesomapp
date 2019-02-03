/*
  news.js

  Outputs news data
*/
const axios = require('axios');

var newsUrl = process.env.NEWS;


var getNews = async (search) => {
  const responce = await axios.get(`${newsUrl}${search}`);
  
  // return {
  //
  // }
}
