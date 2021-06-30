


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
      var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=3097b2b05f2146714d584e3f8a100360";
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
        var currWeatherResults = document.getElementById("currWeather");
        // add location card header
        var cardHeader = document.createElement("h3")
            cardHeader.classList.add("card-header");
        // add current date/time to card header
        var currDate = moment().format('MMMM Do YYYY, h:mm a');
        var cityHeader = ("Current weather for " + data.name + " (" + currDate) + ")";
            console.log(cityHeader)
        // append card header to card
        cardHeader.append(cityHeader);
        currWeatherResults.append(cardHeader);
        var cardBody = document.createElement("card-body");
        currWeatherResults.append(cardBody);
        // display temperature
        cardBody.append($("<p>").attr("class", "card-text").html("Temperature: " + data.main.temp));
        console.log(data.main.temp);
        // display wind speed
        // display humidity
        // display UV Index
      })
  }


searchBtn.addEventListener('click', processSearch);
 



// const resultContainer = document.getElementById("result_container");
// const resultCard = document.getElementById("result_card")
// const searchbutton = document.getElementById("searchbutton")
// const searchinputdrink = document.getElementById("search_inputdrink");
// let boozeResults = document.getElementById("booze-results");

// var inputdrink = 'margarita'
// // var apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + input;
// // var api = "https://api.documenu.com/v2/restaurant/4072702673999819?key=cd34a125c29432346ba6f73259e01e32";



// function displayResults() {
//     // inputdrink = search_inputdrink
//     var apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + inputdrink;


//     fetch(apiUrl)
//         .then(function(response) {
//             if (!response.ok) {
//                 return console.log(response);
//             }
//             return response.json();
//         })
//         .then(function (data) {
//             let drinks = data["drinks"];
//             drinks.forEach( drink => {
//                 console.log(drink)
//                 let divTag = document.createElement('div');
//                 let h2Tag = document.createElement("h2");
//                 divTag.classList.add('card');
//                 h2Tag.classList.add('card-header')
//                 h2Tag.textContent = drink.strDrink;
//                 boozeResults.append(divTag);
//                 divTag.append(h2Tag);
//             })


//         })
//  };

//     console.log("fetching...")


// function displayResults2() {
//     let zipcode = '';
//         fetch("https://api.documenu.com/v2/restaurants/zip_code/" + zipcode + "?key=cd34a125c29432346ba6f73259e01e32")
//             .then(function(response) {
//                 if (!response.ok) {
//                     return console.log(response);
//                 }
//                 return response.json();
//             })
//             .then(function (data) {
    
//                 console.log(data);
    
//             })
//             };
// displayResults();
// displayResults2();

