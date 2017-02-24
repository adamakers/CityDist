
const citiesURL = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const formInpOne = document.querySelector('.input-one');
const formInpTwo = document.querySelector('.input-two');

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


function filterList(theList) {
  
}



formInpOne.addEventListener("input", function(){
  console.log(formInpOne.value);
});



