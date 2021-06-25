var searchBtn = document.querySelector('#searchBtn');
var searchForm = document.querySelector('#searchForm').value;


function displayResults(event) {
  event.preventDefault();

  if (!searchForm) {
    console.error('You need a search input value!');
    return;
  }

//   var queryString = './search-results.html?q=' + searchInputVal + '&format=' + formatInputVal;

//   location.assign(queryString);
}

searchBtn.addEventListener('click', displayResults);