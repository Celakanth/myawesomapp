/*
  news.js

  Outputs news data
*/
require('../../config/config');
const axios = require('axios');

var newsUrl = process.env.NEWS;

var news = [];

var getNews = async (search) => {
  //console.log(`${newsUrl}${search}&from=${theDate()}&sortBy=publishedAt`)
  news = [];
  const responce = await axios.get(`${newsUrl}&q=${search}&from=${theDate()}&sortBy=publishedAt`);
  responce.data.articles.forEach(newsItem => {
    var article ={
      publisheddate: newsItem.publishedAt,
      title: newsItem.title,
      url: newsItem.url,
      description: newsItem.description
    }
    news.push(article);
  });
  return news;
}

var theDate = () =>{
  var today = new Date();
  var dd = today.getDate() - 5;
  var mm = today.getMonth() + 1; //January is 0!

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  } 
  if (mm < 10) {
    mm = '0' + mm;
  } 
  return `${yyyy}-${mm}-${dd}`;
}

module.exports = {getNews};
