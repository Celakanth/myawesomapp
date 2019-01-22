/*
  geocode.js
  Geocode functions
*/

const axios = require('axios');
var geolocateURL = process.env.LOCATION;
var geocodeAddress = async (capturedAddress) => {
const enteredAddress = encodeURIComponent(capturedAddress);
  const responce = await axios.get(`${geolocateURL}?address=${enteredAddress}`);
  //console.log(`The address from session is ${session.address}`);
  return {
    address: responce.data.results[0].formatted_address,
    lat: responce.data.results[0].geometry.location.lat,
    long: responce.data.results[0].geometry.location.lng
  };
};

var citynameGeo = process.env.CITYSEARCH
var getcityName = async (lats,longs) => {
  console.log(lats,longs);
  const responce = await axios.get(`${citynameGeo}${lats},${longs}`);
  var theTown = responce.data.results[0].address_components.filter(cityName =>  cityName.types == 'postal_town');
  console.log(theTown);
  return{
    cityName: theTown[0].long_name
  };
};


module.exports = {geocodeAddress, getcityName};
