/*
  news.js

  Outputs news data
*/
require('../../config/config');
const axios = require('axios');

var newsUrl = process.env.NEWS;

var news = [];

var getNews = async (search) => {
  console.log(`${newsUrl}${search}`)
  const responce = await axios.get(`${newsUrl}${search}`);
  responce.data.articles.forEach(newsItem => {
    var article ={
      date: newsItem.publishedAt,
      title: newsItem.title,
      url: newsItem.url,
      description: newsItem.description
    }
    news.push(article);
  });
  return news;
}

module.exports = {getNews};
