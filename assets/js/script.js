


var searchBtn = document.querySelector('#searchBtn');
var userNode = document.querySelector('#searchForm');
var currDate = moment().subtract(10, 'days').calendar();
var apiKey = "3097b2b05f2146714d584e3f8a100360";





// 3. Use that input to build out your url
// 4. Make the API call and console log your response.
//start looking at the structure of the response and how to snag the values you need to use to update the DOM and start building out that code.

// process search entry to see if entry is valid
function processSearch() {
  // grab user input
    console.log(userNode.value);
      if (userNode.value.length === 0) {
      console.error('You need a search input value!');
      return;
    } else {
      var userInput = userNode.value
      var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=3097b2b05f2146714d584e3f8a100360&units=imperial";
      console.log(apiUrl);
      // pass the input to the next function
      currSearchResults(apiUrl);
    }
}


// process valid search entry to display results
function currSearchResults(apiUrl) {
    fetch(apiUrl)
      .then(function(response) {
        return response.json(); 
      })
      .then(function(data) {
        console.log(data);
        // select weather container card
        var currWeatherResults = $("#currWeather");
        // add location card header
        var cardHeader = document.createElement("h3")
            cardHeader.classList.add("card-header");
        // add current date/time to card header
        var currDate = moment().format('MMMM Do YYYY, h:mm a');
        var cityHeader = ("Current weather for " + data.name + " (" + currDate) + ")";
            console.log(cityHeader);
        // append card header to card
        cardHeader.append(cityHeader);
        currWeatherResults.append(cardHeader);

        // display temperature
        var currTemp = $(`<div class="card-body font-weight-bold">
                        <p>Temperature: ${data.main.temp} °F</p>
                        </div>`);
          currWeatherResults.append(currTemp);
         
        // display wind speed
        var currWind = $(`<div class="card-body font-weight-bold">
                        <p>Wind: ${data.wind.speed} MPH</p>
                        </div>`);
          currWeatherResults.append(currWind);

        // display humidity
        var currHumidity = $(`<div class="card-body font-weight-bold">
                        <p>Humidity: ${data.main.humidity} %</p>
                        </div>`);
          currWeatherResults.append(currHumidity);

        // display UV Index
        var lat = data.coord.lat
        var lon = data.coord.lon
        var geoUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
        console.log(geoUrl);

        fetch(geoUrl)
          .then(function(response) {
            return response.json(); 
          })
          .then(function(UVdata) {
            console.log(UVdata);
          var currUV = $(`<div class="card-body font-weight-bold">
                          <p>UV Index: ${UVdata.current.uvi}</p>
                          </div>`);
            currWeatherResults.append(currUV);
            
          var fiveDay = UVdata.daily
          for (let i = 0; i <= 4; i++) {
            fiveDay[i];
            // console.log(fiveDay[i]);
            renderDay(fiveDay[i]);
          }


        })
  })
}

function renderDay(day) {  
console.log(day);
}

searchBtn.addEventListener('click', processSearch);
 

