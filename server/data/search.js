/*
  search.js

  this searches google api so I can return images
*/

const axios = require('axios');
var geolocateURL = process.env.SEARCH;
var searchImage = async (enteredAddress) =>{
  console.log(`${geolocateURL}${enteredAddress}`);
  const responce = await axios.get(`${geolocateURL}${enteredAddress}`);
  console.log(responce.data.items[0].pagemap.cse_image[0].src);
  return {
    imageurl: responce.data.items[0].pagemap.cse_image[0].src
  }
}

module.exports = {searchImage}
