/*
  geocode.js
  Geocode functions
*/

const axios = require('axios');

var geocodeAddress = async (capturedAddress) => {
const enteredAddress = encodeURIComponent(capturedAddress);
  console.log(`https://maps.googleapis.com/maps/api/geocode/json?address=${enteredAddress}&key=AIzaSyAVl46TxYm5kAqL9nbNEwlUKN--9hIvqL4`);
  const responce = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${enteredAddress}&key=AIzaSyAVl46TxYm5kAqL9nbNEwlUKN--9hIvqL4`);

  console.log(responce.data.results[0].geometry.location.lat,responce.data.results[0].geometry.location.lat);
  return {
    address: responce.data.results[0].formatted_address,
    lat: responce.data.results[0].geometry.location.lat,
    long:responce.data.results[0].geometry.location.lat
  };
};

module.exports = {geocodeAddress};
