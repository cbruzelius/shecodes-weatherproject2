//current date//
let now = new Date();
now.getDay();
now.getHours();
now.getMinutes();
let days = ["Sunday", "Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let day = days[now.getDay()];

//current time//
function formatAMPM(now) {
  var hour = now.getHours();
  var minutes = now.getMinutes();
  var ampm = hour >= 12 ? 'pm' : 'am';
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hour + ':' + minutes + ' ' + ampm;
  return strTime;
}
//show local time//
let localTime = (formatAMPM(now));
let h3 = document.querySelector("h3");
h3.innerHTML=`${day} ${localTime}`;

//search for city//
function searchCity(event) {
  event.preventDefault();
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let apiKey = "436472baa6f7d6e173bf2e9b5defaa56";
    let units= "metric";
    let cityInput = document.querySelector("#city-input");
    let apiURL=`${apiEndpoint}q=${cityInput.value}&appid=${apiKey}&units=${units}`;
   
    axios.get(apiURL).then(function (response) {
      let searchedCityTemp = Math.round(response.data.main.temp)

    let cityElement = document.querySelector("h2");
        cityElement.innerHTML=cityInput.value;      
    let temperature = document.querySelector("#temperature");
       temperature.innerHTML= `${searchedCityTemp}`;
      }
    );
}

//show city & temperature search//
let citySearch = document.querySelector("#city-search");
    citySearch.addEventListener("submit", searchCity);

//button to show local city//
function getCurrentWeather (event){
  event.preventDefault();
    function showLocalCity(response){
      let localCity = response.data.name;
      let localCityName=document.querySelector("#city");
      localCityName.innerHTML=`${localCity}`;
    }

    function showPosition(position) {
      let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
      let apiKey = "436472baa6f7d6e173bf2e9b5defaa56";
      let units= "metric";
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      let apiURL = `${apiEndpoint}lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

      axios.get(apiURL).then(showLocalCity);
    }
    navigator.geolocation.getCurrentPosition(showPosition);

    //show local temperature//
    function showLocalTemp(response) {
      let localTemperature = Math.round(response.data.main.temp);
      let localCityTemp=document.querySelector("#temperature");
      localCityTemp.innerHTML=`${localTemperature}`;
    }
    function showTemperature(position) {
      let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
      let apiKey = "436472baa6f7d6e173bf2e9b5defaa56";
      let units= "metric";
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      let apiURL = `${apiEndpoint}lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

      axios.get(apiURL).then(showLocalTemp);
    }
    navigator.geolocation.getCurrentPosition(showTemperature);
}

let currentLocalWeather = document.querySelector("#current-city");
currentLocalWeather.addEventListener("click", getCurrentWeather)