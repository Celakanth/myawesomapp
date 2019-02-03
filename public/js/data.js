/*
  javascript Weather tiles build up

*/

var imageUrl = "";

function getLocation(address){
  var location;
  if (address != '') {
    $('#weatherList').html('');
    $.get("./location/" + address, function(data, status){
      $.get('./weather/' + data.lat + '/' + data.long, function(weatherData,status){
        var template = $('#WeatherCurrent').html();
        var theDate = new Date(weatherData.daily[0].time);
        var html = Mustache.render(template,{
          weekday: moment(theDate).format('dddd'),
          day: moment(theDate).format('Do MMM'),
          city: weatherData.daily[0].address,
          current: parseInt(weatherData.daily[0].apparentTemperatureHigh),
          percipitation: weatherData.daily[0].precipProbability,
          windSpeed: weatherData.daily[0].windSpeed,
          windDirection: weatherData.daily[0].windBearing,
          icon: weatherData.daily[0].icon
        });
        $('#weatherList').append(html);
        for(var i=1; i < weatherData.daily.length; i++){
          var template = $('#weatherDaily').html();
          var date = new Date(weatherData.daily[i].time);
          var html = Mustache.render(template,{
            day: moment(date).format('dddd'),
            high: parseInt(weatherData.daily[i].apparentTemperatureMax),
            low: parseInt(weatherData.daily[i].apparentTemperatureMin),
            icon: weatherData.daily[i].icon
            //day: item.time
          });
          $('#weatherList').append(html);
        };
        getTownName(data.lat,data.long);
        

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
          for(var i=0; i < weatherData.daily.length; i++){
              
            var weatherToday = new Date(moment(weatherData.daily[i].time)).getDate();
            var Today = new Date().getDate();

            if (Today ==  weatherToday) {
              var template = $('#WeatherCurrent').html();
              var html = Mustache.render(template,{
                weekday: moment(weatherData.daily[i].time).format('dddd'),
                day: moment(weatherData.daily[i].time).format('Do MMM'),
                city: weatherData.address,
                current: parseInt(weatherData.daily[i].apparentTemperatureHigh),
                percipitation: parseInt(weatherData.daily[i].precipProbability),
                windSpeed: weatherData.daily[i].windSpeed,
                windDirection: weatherData.daily[i].windBearing,
                icon: weatherData.daily[i].icon
              });
              $('#weatherList').append(html);
            }
            else {
              var template = $('#weatherDaily').html();
              var date = new Date(weatherData.daily[i].time);
              var html = Mustache.render(template,{
                day: moment(weatherData.daily[i].time).format('dddd'),
                high: parseInt(weatherData.daily[i].apparentTemperatureMax),
                low: parseInt(weatherData.daily[i].apparentTemperatureMin),
                icon: weatherData.daily[i].icon
                //day: item.time
              });
              $('#weatherList').append(html);
            }
          };
        });
      });
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    getTownName(lat,long);
  });
}

function getTownImage(searchData){
  $.get('./image/' + searchData.cityName, function(imageData){
      $('#ScreenImage').css("background-image", "url(" + imageData.imageurl + ")");
  });
  loadVideos(searchData.cityName);
  setNews(searchData.cityName);
}

function getTownName(lat,long){
  var theLat = lat;
  var theLong = long;
  var theUrl = './townName/' + theLat + '/' + theLong;
  $.get(theUrl, function(townName){
    getTownImage(townName);
   
  });
}

function loadVideos(search){
  var template = $('#video_template').html();
  $('#videos').html('');
  $.get('./youtube/' + search, function(results){
    results.forEach(function(item) {
      var html = Mustache.render(template,{
        id: item.id,
        title: item.title,
        description: item.description
      });
      $('#videos').append(html);
    })
  });
  $('.ytp-title-channel-logo').fadeOut();
  $('#town').html('Latest Videos from ' + search);
  $('#location').html(search);
}

function setNews(search){
  var template = $('#news_template').html();
  var newsData = "";
  $('#newsData').html('');
  $.get('./news/' + search, function(responce){
  for(var i = 0; i < 3; i++){
     var html = Mustache.render(template,{
          date: moment(responce[i].date).format('DD MM'),
          title: responce[i].title,
          url: responce[i].url,
          description: responce[i].description
        });
        newsData = newsData + html;
        
    }
    $('#newsData').html(newsData);
  })
}
//   {{weekday}}
//   {{day}}
//   {{city}}
//   {{current}}
//   {{percipitation}}
//   {{windSpeed}}
//   {{windDirection}}
