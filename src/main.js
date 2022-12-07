import { getWeatherByLatLong, getWeatherBySearch } from './weather.js';
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
  icon.innerHTML = `<img src="./icons/${weather.icon}.png"/>`;
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

//========================================================================
// Date & Time
//========================================================================

// const displayTime = document.querySelector('.display-time');
// function showTime() {
//   let time = new Date();
//   displayTime.innerText = time.toLocaleTimeString('en-US', { hour12: false });
//   setTimeout(showTime, 1000);
// }

// showTime();

// // Date
// function updateDate() {
//   let today = new Date();

//   // return number
//   let dayName = today.getDay(),
//     dayNum = today.getDate(),
//     month = today.getMonth(),
//     year = today.getFullYear();

//   const months = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December',
//   ];
//   const dayWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   // value -> ID of the html element
//   const IDCollection = ['day', 'daynum', 'month', 'year'];
//   // return value array with number as a index
//   const val = [dayWeek[dayName], dayNum, months[month], year];
//   for (let i = 0; i < IDCollection.length; i++) {
//     document.getElementById(IDCollection[i]).firstChild.nodeValue = val[i];
//   }
// }

// updateDate();