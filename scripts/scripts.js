
const citiesURL = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const formInpOne = document.querySelector('.input-one');
const formInpTwo = document.querySelector('.input-two');
const resultsList = document.querySelector('.results-list');

let http = new XMLHttpRequest();
let cities;

http.open("GET", citiesURL, true);
http.send();

http.onreadystatechange = function() {
  if (http.readyState === 4 &&
      http.status === 200 ) {
        cities = JSON.parse(http.response);
        //console.log(cities);
      }
}


function filterCityList(searchFor, cities) {
  const regex = new RegExp(searchFor, 'gi');
  return cities.filter(function(place){
    return place.city.match(regex) ||
           place.state.match(regex);
  });
}

function displayCities() {
  const val = this.value;
  const filteredList = filterCityList(this.value, cities);
  const displayList = filteredList.map(item => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = item.city.replace(regex, '<span>' + this.value + '</span>');
    const stateName = item.state.replace(regex, `<span>${this.value}</span>`);
    return `<li>${cityName}, ${stateName}</li>`;
  }).join('');

  if (this.value) {
    resultsList.innerHTML = displayList;
  } else {
    resultsList.innerHTML = '';
  }
  
}

// EVENT LISTENERS
formInpOne.addEventListener("input", displayCities);



