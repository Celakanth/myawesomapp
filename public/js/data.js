function getLocation(address){
  var location;
  if (address != '') {
    $('#weatherList').html('');
    $.get("./location/" + address, function(data, status){
      $.get('./weather/' + data.lat + '/' + data.long, function(weatherData,status){
        var template = $('#WeatherCurrent').html();
        var html = Mustache.render(template,{
          weekday: moment(weatherData.daily[0].time).format('dddd'),
          day: moment(weatherData.daily[0].time).format('Do MMM'),
          city: weatherData.daily[0].address,
          current: parseInt(weatherData.daily[0].apparentTemperatureHigh),
          percipitation: weatherData.daily[0].precipProbability,
          windSpeed: weatherData.daily[0].windSpeed,
          windDirection: weatherData.daily[0].windBearing
        });
        $('#weatherList').append(html);
        for(var i=1; i < weatherData.daily.length; i++){
          var template = $('#weatherDaily').html();
          var date = new Date(weatherData.daily[i].time);
          var html = Mustache.render(template,{
            day: moment(weatherData.daily[i].time).format('dddd'),
            high: parseInt(weatherData.daily[i].apparentTemperatureMax),
            low: parseInt(weatherData.daily[i].apparentTemperatureMin)
            //day: item.time
          });
          $('#weatherList').append(html);
        };
      });
    });
  }
  else {
    setCurrentData();
  }
}

function setCurrentData(){

  if(!navigator.geolocation){
    return alet('Geolocation not supported by your browser');
  }
  $('#weatherList').html('');
  navigator.geolocation.getCurrentPosition(function (position){
      $.get('./location/' + position.coords.latitude + ',' + position.coords.longitude, function(locationData){
        $.get('./weather/' + position.coords.latitude + '/' + position.coords.longitude, function(weatherData,status){
          var template = $('#WeatherCurrent').html();
          var html = Mustache.render(template,{
            weekday: moment(weatherData.daily[0].time).format('dddd'),
            day: moment(weatherData.daily[0].time).format('Do MMM'),
            city: weatherData.address,
            current: parseInt(weatherData.daily[0].apparentTemperatureHigh),
            percipitation: parseInt(weatherData.daily[0].precipProbability),
            windSpeed: weatherData.daily[0].windSpeed,
            windDirection: weatherData.daily[0].windBearing
          });
          $('#weatherList').append(html);
          for(var i=1; i < weatherData.daily.length; i++){
            var template = $('#weatherDaily').html();
            var date = new Date(weatherData.daily[i].time);
            var html = Mustache.render(template,{
              day: moment(weatherData.daily[i].time).format('dddd'),
              high: parseInt(weatherData.daily[i].apparentTemperatureMax),
              low: parseInt(weatherData.daily[i].apparentTemperatureMin)
              //day: item.time
            });
            $('#weatherList').append(html);
        };
      });
    });
  });
}
//   {{weekday}}
//   {{day}}
//   {{city}}
//   {{current}}
//   {{percipitation}}
//   {{windSpeed}}
//   {{windDirection}}
