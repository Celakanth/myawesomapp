/*
  weather.js
  Weather functions
*/

const axios = require('axios');

var weatherDataDaily = async (latatude,logdatude) => {
  const responce = await axios.get(`https://api.darksky.net/forecast/4e9523e410dee31f761e0f332ef22c32/${latatude},${logdatude}?units=auto`);
  var theWeatherData = {
      summary: responce.data.daily.summary, //"Light rain on Friday, with high temperatures falling to 43°F on Thursday.",
      icon: responce.data.daily.icon, //"rain",
    };
  var daily = [];
    responce.data.daily.data.forEach((item) => {
      var data = {
        time: item.time,
        summary: item.summary,
        icon: item.icon,
        sunriseTime: item.sunriseTime,
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

var weatherData = async (latatude,logdatude) => {
  const responce = await axios.get(`https://api.darksky.net/forecast/4e9523e410dee31f761e0f332ef22c32/${latatude},${logdatude}?units=auto`);
  return {
            summary: responce.data.summary, //"Light rain on Friday, with high temperatures falling to 43°F on Thursday.",
            icon: responce.data.icon //"rain",
          };

};

module.exports = {weatherDataDaily, weatherData};
