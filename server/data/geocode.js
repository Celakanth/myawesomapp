/*
  geocode.js
  Geocode functions
*/

const axios = require('axios');
var geolocateURL = process.env.LOCATION;
var geocodeAddress = async (capturedAddress) => {
const enteredAddress = encodeURIComponent(capturedAddress);
  const responce = await axios.get(`${geolocateURL}?address=${enteredAddress}`);
  return {
    address: responce.data.results[0].formatted_address,
    lat: responce.data.results[0].geometry.location.lat,
    long: responce.data.results[0].geometry.location.lng
  };
};

module.exports = {geocodeAddress};
