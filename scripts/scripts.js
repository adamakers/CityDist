(function(){

  const citiesURL = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
  const formInpOne = document.querySelector('.input-one');
  const formInpTwo = document.querySelector('.input-two');
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
    
    if (target.tagName === 'SPAN' || target.tagName === 'LI') {
      if (target.tagName === 'SPAN') {
        chosenCity = target.parentNode.textContent.toLowerCase();
      } else if (target.tagName === 'LI') {
        chosenCity = target.textContent.toLowerCase();
      }

      chosenCity = chosenCity.split(', ');
      const filteredCity = cities.filter(function(place){
        return place.city.toLowerCase() === chosenCity[0] && place.state.toLowerCase();
      });

      console.log(filteredCity); 
    }
  }


  // EVENT LISTENERS
  formInpOne.addEventListener("input", displayCities);
  resultsList.addEventListener("click", clickListItem);

})();


