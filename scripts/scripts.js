(function(){
  let cityOne;
  let cityTwo;
  const citiesURL = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
  const formInpOne = document.querySelector('.input-one');
  const resultsList = document.querySelector('.results-list');


  //AJAX calls to get JSON city data
  let http = new XMLHttpRequest();
  let cities;

  http.open("GET", citiesURL, true);
  http.send();
  http.onreadystatechange = function() {
    if ( http.readyState === 4 &&
        http.status === 200 ) {
          cities = JSON.parse(http.response);
    }
  }

  //filters cities based off of what is in the search bar
  function filterCityList(searchFor, cities) {
    const regex = new RegExp(searchFor, 'gi');
    return cities.filter(function(place){
      return place.city.match(regex) ||
            place.state.match(regex);
    });
  }

  //adds list items to drop down for suggestive search
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

  //figure out which item was clicked
  function clickListItem(e) {
    const target = e.target;
    let chosenCity;
    //if element clicked is a span or list-item grab name of city from textcontent.
    //ignores event if not span or li
    if (target.tagName === 'SPAN' || target.tagName === 'LI') {
      if (target.tagName === 'SPAN') {
        chosenCity = target.parentNode.textContent.toLowerCase();
      } else if (target.tagName === 'LI') {
        chosenCity = target.textContent.toLowerCase();
      }
      //splits city into array of name[0] and state[1];
      chosenCity = chosenCity.split(', ');
      //filter cities array to find match based off of name and state, retrieves object
      //removes from array with .shift()
      const filteredCity = cities.filter(function(place){
        return place.city.toLowerCase() === chosenCity[0] && place.state.toLowerCase();
      }).shift();

      //assigns first variable then second variable
      if (!cityOne && !cityTwo) {
        cityOne = filteredCity;
      } else if(cityOne && !cityTwo) {
        cityTwo = filteredCity;
      }
      formInpOne.value = '';
    }
  }

  //performs lat long distance.

  function calculateDistance(locOne, locTwo) {
    let radLatOne = Math.PI * locOne.latitude / 180;
    let radLatTwo = Math.PI * locTwo.latitude / 180;
  }


  


  // EVENT LISTENERS
  formInpOne.addEventListener("input", displayCities);
  resultsList.addEventListener("click", clickListItem);
  formInpOne.addEventListener("focus", function(){
    console.log('asdf');
  });

})();


