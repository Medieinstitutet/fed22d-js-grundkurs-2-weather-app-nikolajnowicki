import { getWeatherByLatLong, getWeatherBySearch, getForecastByLatLong, getForecastBySearch } from './weather.js';
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
const windSpeed = document.querySelector('#wind');
const humdid = document.querySelector('#humidity');
const sunRise = document.querySelector('#sunRise');
const sunSet = document.querySelector('#sunSet');

// Forecast Elements //

const tempForecast1 = document.querySelector('#forecastTemp1');
const dayForecast1 = document.querySelector('#forecastDay1');
const iconForecast1 = document.querySelector('#forecastIcon1');

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

  const dataForecast = await getForecastByLatLong(latitude, longitude);
  displayForecast(dataForecast);
}

//========================================================================
// Show error when location is not found
//========================================================================

export function showError(error) {
  notification.innerHTML = `${error.message}`;
  notification.classList.remove('hidden');
}

export function hideError() {
  notification.classList.add('hidden');
}

//========================================================================
// Render weather data in the DOM
//========================================================================

// Main Weather Card

export function displayWeather(data) {
  hideError();
  const weather = data.weather[0];
  icon.innerHTML = `<img src="./icons/${weather.icon}.png"/>`;
  temp.innerHTML = `${Math.floor(data.main.temp - KELVIN)} °<span class="cSpan">C</span>`;
  desc.innerHTML = weather.description;
  myLocation.innerHTML = `${data.name}, ${data.sys.country}`;
  windSpeed.innerHTML = `Wind - ${Math.floor(data.wind.speed)} m/s`;
  humdid.innerHTML = `Humidity - ${data.main.humidity}%`;
  sunRise.innerHTML = data.sys.sunrise * 1000;
  sunSet.innerHTML = data.sys.sunset;
}

// Forecast

export function displayForecast(dataForecast) {
  hideError();
  const forecastIcon1 = dataForecast.list[8].weather[0];
  tempForecast1.innerHTML = `${Math.floor(dataForecast.list[8].main.temp - KELVIN)} °`;
  dayForecast1.innerHTML = `${getWeekDay(new Date(dataForecast.list[6].dt * 1000))}`;
  iconForecast1.innerHTML = `<img src="./icons/${forecastIcon1.icon}.png"/>`;
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

  const dataForecast = await getForecastBySearch(search);
  if (dataForecast) {
    displayForecast(dataForecast);
  }
});

//========================================================================
// Date & Time
//========================================================================

// Clock //

function clock() {
  var time = new Date(),
    hours = time.getHours(),
    minutes = time.getMinutes(),
    seconds = time.getSeconds();

  document.querySelectorAll('.clock')[0].innerHTML = printTime(hours) + ':' + printTime(minutes);

  function printTime(standIn) {
    if (standIn < 10) {
      standIn = '0' + standIn;
    }
    return standIn;
  }
}
clock();
setInterval(clock, 1000);

// Today's Date //
function updateDate() {
  let today = new Date();

  // return number
  let dayName = today.getDay(),
    dayNum = today.getDate(),
    month = today.getMonth();

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dayWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const IDCollection = ['day', 'daynum', 'month', 'year'];
  const val = [dayWeek[dayName], dayNum, months[month]];
  for (let i = 0; i < IDCollection.length; i++) {
    document.getElementById(IDCollection[i]).firstChild.nodeValue = val[i];
  }
}

updateDate();

function getWeekDay(date) {
  const options = { weekday: 'long' };
  return date.toLocaleString('en-us', options);
}

//========================================================================
// Weather Forecast
//========================================================================
