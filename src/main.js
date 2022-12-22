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
const appBackground = document.querySelector('#background');

// Forecast Elements //

const tempForecast1 = document.querySelector('#forecastTemp1');
const dayForecast1 = document.querySelector('#forecastDay1');
const iconForecast1 = document.querySelector('#forecastIcon1');

const tempForecast2 = document.querySelector('#forecastTemp2');
const dayForecast2 = document.querySelector('#forecastDay2');
const iconForecast2 = document.querySelector('#forecastIcon2');

const tempForecast3 = document.querySelector('#forecastTemp3');
const dayForecast3 = document.querySelector('#forecastDay3');
const iconForecast3 = document.querySelector('#forecastIcon3');

const tempForecast4 = document.querySelector('#forecastTemp4');
const dayForecast4 = document.querySelector('#forecastDay4');
const iconForecast4 = document.querySelector('#forecastIcon4');

const tempForecast5 = document.querySelector('#forecastTemp5');
const dayForecast5 = document.querySelector('#forecastDay5');
const iconForecast5 = document.querySelector('#forecastIcon5');

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

// Main Weather Card //

export function displayWeather(data) {
  hideError();
  const weather = data.weather[0];
  icon.innerHTML = `<img src="./icons/${weather.icon}.svg"/>`;
  temp.innerHTML = `${Math.floor(data.main.temp - KELVIN)} °<span class="cSpan">C</span>`;
  desc.innerHTML = weather.description;
  myLocation.innerHTML = `${data.name}, ${data.sys.country}`;
  windSpeed.innerHTML = `Wind speed - ${Math.floor(data.wind.speed)} m/s`;
  humdid.innerHTML = `Humidity - ${data.main.humidity}%`;

  // Sunrise & Sunset Converter //

  // Get the Unix timestamps from the API
  let sunriseTimestamp = data.sys.sunrise * 1000;
  let sunsetTimestamp = data.sys.sunset * 1000;

  // Convert the timestamps to Date objects
  let sunriseDate = new Date(sunriseTimestamp);
  let sunsetDate = new Date(sunsetTimestamp);

  // Format the times using the toLocaleTimeString() method and a custom format string
  let sunriseTime = sunriseDate.toLocaleTimeString('sv-SE', { hour: 'numeric', minute: 'numeric' });
  let sunsetTime = sunsetDate.toLocaleTimeString('sv-SE', { hour: 'numeric', minute: 'numeric' });

  // Use the formatted times to update the elements on the page
  sunRise.innerHTML = `Sunrise: ${sunriseTime}`;
  sunSet.innerHTML = `Sunset: ${sunsetTime}`;
}

// Forecast Cards //

export function displayForecast(dataForecast) {
  hideError();
  const forecastIcon1 = dataForecast.list[12].weather[0];
  tempForecast1.innerHTML = `${Math.floor(dataForecast.list[10].main.temp - KELVIN)} °`;
  dayForecast1.innerHTML = `${getWeekDay(new Date(dataForecast.list[10].dt * 1000))}`;
  iconForecast1.innerHTML = `<img src="./icons/forecast/${forecastIcon1.icon}.svg"/>`;

  const forecastIcon2 = dataForecast.list[18].weather[0];
  tempForecast2.innerHTML = `${Math.floor(dataForecast.list[18].main.temp - KELVIN)} °`;
  dayForecast2.innerHTML = `${getWeekDay(new Date(dataForecast.list[18].dt * 1000))}`;
  iconForecast2.innerHTML = `<img src="./icons/forecast/${forecastIcon2.icon}.svg"/>`;

  const forecastIcon3 = dataForecast.list[26].weather[0];
  tempForecast3.innerHTML = `${Math.floor(dataForecast.list[26].main.temp - KELVIN)} °`;
  dayForecast3.innerHTML = `${getWeekDay(new Date(dataForecast.list[26].dt * 1000))}`;
  iconForecast3.innerHTML = `<img src="./icons/forecast/${forecastIcon3.icon}.svg"/>`;

  const forecastIcon4 = dataForecast.list[32].weather[0];
  tempForecast4.innerHTML = `${Math.floor(dataForecast.list[32].main.temp - KELVIN)} °`;
  dayForecast4.innerHTML = `${getWeekDay(new Date(dataForecast.list[32].dt * 1000))}`;
  iconForecast4.innerHTML = `<img src="./icons/forecast/${forecastIcon4.icon}.svg"/>`;

  const forecastIcon5 = dataForecast.list[39].weather[0];
  tempForecast5.innerHTML = `${Math.floor(dataForecast.list[39].main.temp - KELVIN)} °`;
  dayForecast5.innerHTML = `${getWeekDay(new Date(dataForecast.list[39].dt * 1000))}`;
  iconForecast5.innerHTML = `<img src="./icons/forecast/${forecastIcon5.icon}.svg"/>`;
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
updateBackground();
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
// Seasonal Wallpapers & Night / Day
//========================================================================

function updateBackground() {
  const backgrounds = {
    winter: {
      day: 'winter_day_desktop.png',
      night: 'winter_night_desktop.png',
    },
    spring: {
      day: 'spring_day_desktop.png',
      night: 'spring_night_desktop.png',
    },
    summer: {
      day: 'summer_day_desktop.png',
      night: 'summer_night_desktop.png',
    },
    fall: {
      day: 'fall_day_desktop.png',
      night: 'fall_night_desktop.png',
    },
  };

  // Get the current month and time of day
  let month = new Date().getMonth();
  let hour = new Date().getHours();
  let timeOfDay = hour >= 6 && hour < 18 ? 'day' : 'night';

  // Determine the current season based on the month
  let season;
  if (month === 11 || month < 2) {
    season = 'winter';
  } else if (month >= 2 && month < 5) {
    season = 'spring';
  } else if (month >= 5 && month < 8) {
    season = 'summer';
  } else {
    season = 'fall';
  }

  // Set the background image for the current season and time of day
  appBackground.style.backgroundImage = "url('/backgrounds/" + backgrounds[season][timeOfDay] + "')";
}

setInterval(updateBackground, 3600000);
