import { getWeatherByLatLong, getWeatherBySearch } from './weather';
export const key = 'c6591c1b90538868d222b418445f608e';
//========================================================================
// HTML Elements
//========================================================================

const icon = document.querySelector('#weatherIcon');
const temp = document.querySelector('#temperatureValue');
const desc = document.querySelector('#temperatureDescription');
const myLocation = document.querySelector('#myLocation');
const notification = document.querySelector('#geoNotification');
const searchForm = document.querySelector('#searchForm');

//========================================================================
// App Data
//========================================================================

const weather = {};
weather.temperature = {
  unit: 'celsius',
};

//========================================================================
// Variables
//========================================================================

const KELVIN = 273;

//========================================================================
// Does the browser allow geolocation?
//========================================================================

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notification.style.display = 'block';
  notification.innerHTML = 'Your browser does not support geolocalization';
}

//========================================================================
// Set user's position
//========================================================================

async function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  const data = await getWeatherByLatLong(latitude, longitude);
  displayWeather(data);
}

//========================================================================
// Show error when location is not found
//========================================================================

export function showError(error) {
  notification.style.display = 'block';
  notification.innerHTML = `${error.message}`;
}

//========================================================================
// Render weather data in the DOM
//========================================================================

export function displayWeather(data) {
  const weather = data.weather[0];
  icon.innerHTML = `<img src="./public/icons/${weather.icon}.png"/>`;
  temp.innerHTML = `${Math.floor(data.main.temp - KELVIN)} °<span class="cSpan">C</span>`;
  desc.innerHTML = weather.description;
  myLocation.innerHTML = `${data.name}, ${data.sys.country}`;
}

//========================================================================
// Search bar
//========================================================================

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const search = formData.get('search');

  const data = await getWeatherBySearch(search);
  if (data) {
    displayWeather(data);
  }
});
