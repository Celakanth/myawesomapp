/*
  search.js

  this searches google api so I can return images
*/

const axios = require('axios');
var geolocateURL = process.env.SEARCH;
var searchImage = async (enteredAddress) =>{

  const responce = await axios.get(`${geolocateURL}${enteredAddress}`);
  
  if (responce.data.items[0].pagemap.cse_image.length > 0 ) {
      return {
            imageurl: responce.data.items[0].pagemap.cse_image[0].src
        }
      }
    else{
      return {
            imageurl: responce.data.items[0].pagemap.cse_image[0].src
        }
      }
    }
  

module.exports = {searchImage}
