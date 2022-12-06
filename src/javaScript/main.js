//========================================================================
// HTML Elements                     
//========================================================================

const icon = document.querySelector('#weatherIcon');
const temp = document.querySelector('#temperatureValue');
const desc = document.querySelector('#temperatureDescription');
const myLocation = document.querySelector('#myLocation');
const notification = document.querySelector('#geoNotification');

//========================================================================
// App Data                          
//========================================================================

const weather = {};
weather.temperature = {
    unit: 'celsius'
};

//========================================================================
// Variables                      
//========================================================================

const KELVIN = 273;
const key = 'c6591c1b90538868d222b418445f608e';

//========================================================================
// Does the browser allow geolocation?
//========================================================================

if ('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notification.style.display ='block';
    notification.innerHTML = "<p> Your browser does not support geolocalization";
};

//========================================================================
// Set user's position
//========================================================================

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
};

//========================================================================
// Show error when location is not found
//========================================================================

function showError(error) {
    notification.style.display ='block';
    notification.innerHTML = `${error.message}`;
}

//========================================================================
// Gets weather information from OpenWeather API
//========================================================================

function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`

    fetch(api).then(function(response){
        let data = response.json();
        console.log(api)
        return data;
    })
    .then(function(data){
       weather.temperature.value = Math.floor(data.main.temp - KELVIN);
       weather.description = data.weather[0].description;
       weather.iconId = data.weather[0].icon;
       weather.city = data.name;
       weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    });
}

//========================================================================
// Render weather data in the DOM
//========================================================================

function displayWeather() {
    icon.innerHTML = `<img src="./public/icons/${weather.iconId}.png"/>`
    temp.innerHTML = `${weather.temperature.value} °<span class="cSpan">C</span>`;
    desc.innerHTML = weather.description;
    myLocation.innerHTML = `${weather.city}, ${weather.country}`;
}