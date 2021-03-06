/*
  weather.js
  Weather functions
*/

const axios = require('axios');
var weather = process.env.WEATHERURL;

//database 
//const mongoose = require('mongoose');
//const Schema = moongoose.Schema;



var weatherDataDaily = async (latatude,logdatude) => {
  const responce = await axios.get(weather + `${latatude},${logdatude}?units=auto`);
  var theWeatherData = {
      summary: responce.data.daily.summary, //"Light rain on Friday, with high temperatures falling to 43°F on Thursday.",
      icon: responce.data.daily.icon, //"rain",
    };
  var daily = [];
    responce.data.daily.data.forEach((item) => {
      var date = new Date(item.time*1000);
      var sunDate = new Date(item.sunriseTime*1000);
      var weatherImage = "";
      if (true) {
        weatherImage = item.icon.replace('night','day');
      }
      else{
        weatherImage = item.icon;
      }
      var data = {
        time: date,
        summary: item.summary,
        icon: `./images/icons/${weatherImage}.svg`,
        sunriseTime: sunDate,
        sunsetTime: item.sunsetTime,
        moonPhase: item.moonPhase,
        precipIntensity: item.precipIntensity,
        precipIntensityMax: item.precipIntensityMax,
        precipIntensityMaxTime: item.precipIntensityMaxTime,
        precipProbability: item.precipProbability,
        precipType: item.precipType,
        temperatureHigh: item.temperatureHigh,
        temperatureHighTime: item.temperatureHighTime,
        temperatureLow: item.temperatureLow,
        temperatureLowTime: item.temperatureLowTime,
        apparentTemperatureHigh: item.apparentTemperatureHigh,
        apparentTemperatureHighTime: item.apparentTemperatureHighTime,
        apparentTemperatureLow: item.apparentTemperatureLow,
        apparentTemperatureLowTime: item.apparentTemperatureLowTime,
        dewPoint: item.dewPoint,
        humidity: item.humidity,
        pressure: item.pressure,
        windSpeed: item.windSpeed,
        windGust: item.windGust,
        windGustTime: item.windGustTime,
        windBearing: item.windBearing,
        cloudCover: item.cloudCover,
        uvIndex: item.uvIndex,
        uvIndexTime: item.uvIndexTime,
        visibility: item.visibility,
        ozone: item.ozone,
        temperatureMin: item.temperatureMin,
        temperatureMinTime: item.temperatureMinTime,
        temperatureMax: item.temperatureMax,
        temperatureMaxTime: item.temperatureMaxTime,
        apparentTemperatureMin: item.apparentTemperatureMin,
        apparentTemperatureMinTime: item.apparentTemperatureMinTime,
        apparentTemperatureMax: item.apparentTemperatureMax,
        apparentTemperatureMaxTime: item.apparentTemperatureMaxTime
      }
      daily.push(data);
    });
    theWeatherData.daily = daily;
    return theWeatherData;
  };

  var weatherHourly = async (latatude,logdatude) => {
    var hourlyData = [];
    const responce = await axios.get(weather + `${latatude},${logdatude}?units=auto`);
    responce.data.hourly.data.forEach((item) => {
      var date = new Date(item.time*1000);
      weatherImage = item.icon.replace('night','day');
      var conditions = {
        time: date,
        summary: item.summary,
        icon: weatherImage,
        precipIntensity: item.precipIntensity,
        precipProbability: item.precipProbability,
        temperature: item.temperature,
        cloudCover: item.cloudCover
      }
      hourlyData.push(conditions);
    })
    return hourlyData;
  }

var weatherData = async (latatude,logdatude) => {
  const responce = await axios.get(`${weather}${latatude},${logdatude}?units=auto`);
  return {
            summary: responce.data.summary, //"Light rain on Friday, with high temperatures falling to 43°F on Thursday.",
            icon: responce.data.icon //"rain",
          };

};

module.exports = {weatherDataDaily, weatherData, weatherHourly};
