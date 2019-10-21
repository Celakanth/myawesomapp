/*
  javascript Weather tiles build up

*/

var imageUrl = "";

function getLocation(address){
  var location;
  if (address != '') {
    $('#weatherList').html('');
    $.get("./location/" + address, function(data, status){
      $.get('./weatherHourly/' + data.lat + '/' + data.long, function(weatherData,status){
        if(weatherData.length >= 12){
          for(var i=0; i < 12; i++){
              
            var weatherToday = new Date(moment(weatherData[i].time)).getDate();
            var template = $('#weatherHourly').html();
              var html = Mustache.render(template,{
                day: moment(weatherData[i].time).format('DD , h:mm a'),
                precipProbability: parseInt(weatherData[i].precipProbability),
                precipIntensity: parseInt(weatherData[i].precipIntensity),
                icon: `/images/icons/${weatherData[i].icon}.svg`
                //day: item.time
              });
            $('#weatherList').append(html);
          }
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
        $.get('./weatherHourly/' + position.coords.latitude + '/' + position.coords.longitude, function(weatherData,status){
          if(weatherData.length >= 12){
            for(var i=0; i < 12; i++){
                
              var weatherToday = new Date(moment(weatherData[i].time)).getDate();
              var Today = new Date().getDate();

              var template = $('#weatherHourly').html();
              var date = new Date(weatherData[i].time);
              var html = Mustache.render(template,{
                day: moment(weatherData[i].time).format('DD , h:mm a'),
                precipProbability: parseInt(weatherData[i].precipProbability),
                precipIntensity: parseInt(weatherData[i].precipIntensity),
                icon: `/images/icons/${weatherData[i].icon}.svg`
                //day: item.time
              });
              $('#weatherList').append(html);
            };
          }
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
  //loadVideos(searchData.cityName);
  //setNews(searchData.cityName);
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
    if(i < responce.length){
     var html = Mustache.render(template,{
          date: moment(responce[i].publisheddate).format('DD MM'),
          title: responce[i].title,
          url: responce[i].url,
          description: responce[i].description
        });
        newsData = newsData + html;
      }
        
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
