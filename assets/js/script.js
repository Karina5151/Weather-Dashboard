var searchBtn = document.querySelector('#searchBtn');
// var userNode = document.querySelector('#searchForm');
var currDate = moment().subtract(10, 'days').calendar();
var apiKey = "3097b2b05f2146714d584e3f8a100360";


// process search entry to see if entry is valid
function processSearch() {
  // grab user input
  var userInput = $('#searchForm').val();
  console.log(userInput);

  if (userInput.length === 0) {
    console.error('You need a search input value!');
    return;
  } else {
    currSearchResults(userInput);
  }
}

// Display Current Weather Results
function currSearchResults(userInput) {

  // fetch current weather data
  var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${apiKey}&units=imperial`;
  console.log(weatherUrl);

  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // fetch current UV data
      var lat = data.coord.lat
      var lon = data.coord.lon
      var forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
      console.log(forecastUrl);

      fetch(forecastUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (forecastData) {
          console.log(forecastData);

          // Build Current Weather Card
          var currDate = moment().format('MMMM Do YYYY');
          var weatherImg = data.weather[0].icon

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

          // Iterate through 5-Day Forecast Data to get single day data
          var fiveDay = forecastData.daily
          for (let i = 1; i <= 5; i++) {
            fiveDay[i];
            // console.log(fiveDay[i]);
            renderDay(fiveDay[i]);
          }
        });
    });
}

// redefine "fiveDay[i]" to "day" just by changing the term when passing it over to the next function
function renderDay(day) {
  console.log(day);
  // creating dates for 5 day forecast
  var date = new Date(day.dt * 1000);
  var formattedDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

  //add temp
  var dayTemp = day.temp.day
  var dayImg = day.weather[0].icon
  var dayDescript = day.weather[0].description
  var dayWind = day.wind_speed
  var dayHumidity = day.humidity

  // $('#icon').attr("alt", temp.weather[0].description)
  {/* <h4 class="card-title">${formattedDate}</h4> */ }

  // making day cards
  var dayCard = $(`
      <div class="card forecastCard">
        <div class="card-header">
          
          <h4 class="card-title">${moment(date.dt_txt).format('dddd')} ${moment(date.dt_txt).subtract(10, 'days').calendar()}</h4>
        </div>
        <div class="card-body">
          <img src="https://openweathermap.org/img/wn/${dayImg}@2x.png"/>
          <p>Weather: ${dayDescript}</p>
          <p>Temp: ${dayTemp} °F</p>
          <p>Wind: ${dayWind} MPH</p>
          <p>Humidity: ${dayHumidity} %</p>
      </div>`);
  console.log(date);

  // apending day cards to html container
  var fiveContainer = $("#fiveDay")
  fiveContainer.append(dayCard);



}





searchBtn.addEventListener('click', processSearch);


