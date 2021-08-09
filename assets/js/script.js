var searchBtn = document.querySelector('#searchBtn');
var currDate = moment().subtract(10, 'days').calendar();
var apiKey = "3097b2b05f2146714d584e3f8a100360";


// process search entry to see if entry is valid
function processSearch(a) {
  a.preventDefault();
  // grab user input
  var userInput = $('#searchForm').val();
  console.log("User Input Results:", userInput);

  if (userInput.length === 0) {
    console.error('You need a search input value!');
    return;
  } else {
    $('#currWeather').empty();
    $('#fiveDayCards').empty();
    currSearchResults(userInput);
  }
}

// Display Current Weather Results
function currSearchResults(userInput) {
  // $('#currWeather').empty();

  // fetch current weather data
  var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${apiKey}&units=imperial`;
  // console.log("WeatherURL Results:", weatherUrl);

  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Weather Data Results:", data);

      // fetch current UV data
      var lat = data.coord.lat
      var lon = data.coord.lon
      var forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
      // console.log("ForecastURL Results:", forecastUrl);

      fetch(forecastUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (forecastData) {
          console.log("ForeCast Data Results:", forecastData);

          // Create Current Weather Card
          var currDate = moment().format('dddd MMMM Do YYYY');
          var weatherImg = data.weather[0].icon
          // Dynamically create card
          var currWeatherCard = $(`
        <div class="card weatherCard">
          <div class="card-header">
            <h3 class="card-title">
            Current weather for ${data.name} on ${currDate}
            <img src="https://openweathermap.org/img/wn/${weatherImg}@2x.png"/>
            </h3>
          </div>
          <div class="card-body font-weight-bold">
            <p>Temperature: ${data.main.temp} °F</p>
            <p>Wind: ${data.wind.speed} MPH</p>
            <p>Humidity: ${data.main.humidity} %</p>
            <p>UV Index: ${forecastData.current.uvi}</p>
          </div>
        </div>
      `)
          // Append Current Weather Card to HTML container
          var currWeatherResults = $("#currWeather");
          currWeatherResults.append(currWeatherCard)


          fiveDayForecastResults(forecastData);
        });
    });
}



// Display 5 Day Forecast Results
function fiveDayForecastResults(forecastData) {

  // Dynamically create forecast header and container for the 5 cards
  var forecastDisplay = $("#forecastDisplay");
  var forecastHeader = $("<h3>").text("5-Day Forecast");
  forecastDisplay.append(forecastHeader);
  var fiveDayCards = $("<div>").attr("id","fiveDayCards");
  forecastDisplay.append(fiveDayCards)

  // Iterate through 5-Day Forecast Data to get single day data
  var fiveDay = forecastData.daily

  for (let i = 1; i <= 5; i++) {
    var day = fiveDay[i];
    console.log("Day Results:", day);
    
    // Creating 5 day Forecast Cards
    var date = new Date(day.dt * 1000);
        console.log("Date Results:", date);
    var dayTemp = day.temp.day
    var dayImg = day.weather[0].icon
    var dayDescript = day.weather[0].description
    var dayWind = day.wind_speed
    var dayHumidity = day.humidity

    // Dynamically create card
    $('#fiveDayCards').append(`
          <div class="card forecastCard">
          <div class="card-header">
            <h4 class="card-title">${moment(date).format('dddd')} ${moment(date).format('L')}</h4>
          </div>
          <div class="card-body">
            <img src="https://openweathermap.org/img/wn/${dayImg}@2x.png"/>
            <p>Weather: ${dayDescript}</p>
            <p>Temp: ${dayTemp} °F</p>
            <p>Wind: ${dayWind} MPH</p>
            <p>Humidity: ${dayHumidity} %</p>
          </div>`);
  }
}





searchBtn.addEventListener('click', processSearch);



// fiveDayForecastResults(forecastData);
// });
// });
// }



// // Display 5 Day Forecast Results
// function fiveDayForecastResults(forecastData) {

// // redefine "fiveDay[i]" to "day" by changing the term when passing it through
// console.log("forecastData Results:", forecastData);

// var forecastDisplay = $("#forecastDisplay");
// var forecastHeader = $("<h3>").text("5-Day Forecast");
// forecastDisplay.append(forecastHeader);
// var fiveDayCards = $("<div>");
// forecastDisplay.append(fiveDayCards)

// // Iterate through 5-Day Forecast Data to get single day data
// var fiveDay = forecastData.daily

// for (let i = 1; i <= 5; i++) {
// var day = fiveDay[i];

// // Creating 5 day Forecast Cards
// var date = new Date(day.dt * 1000);
// console.log("Date Results:", date);
// var dayTemp = day.temp.day
// var dayImg = day.weather[0].icon
// var dayDescript = day.weather[0].description
// var dayWind = day.wind_speed
// var dayHumidity = day.humidity
// // Dynamically create card
// var dayCard = $(`
//   <div class="card forecastCard">
//   <div class="card-header">
//     <h4 class="card-title">${moment(date).format('dddd')} ${moment(date).format('L')}</h4>
//   </div>
//   <div class="card-body">
//     <img src="https://openweathermap.org/img/wn/${dayImg}@2x.png"/>
//     <p>Weather: ${dayDescript}</p>
//     <p>Temp: ${dayTemp} °F</p>
//     <p>Wind: ${dayWind} MPH</p>
//     <p>Humidity: ${dayHumidity} %</p>
//   </div>`);

// // Append Forecast Cards to HTML container
// fiveDayCards.append(dayCard);
// }


// }