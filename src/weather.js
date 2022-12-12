import { displayWeather, displayForecast, key, showError } from './main.js';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

//========================================================================
// Gets weather information from OpenWeather API
//========================================================================

export async function getWeatherByLatLong(latitude, longitude) {
  const url = `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${key}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

export async function getWeatherBySearch(city) {
  const url = `${BASE_URL}?q=${city}&appid=${key}`;

  const response = await fetch(url);
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    showError({ message: 'Cannot find city' });
  }
}

//========================================================================
// Gets Forecast information from OpenWeather API
//========================================================================

export async function getForecastByLatLong(latitude, longitude) {
  const urlCast = `${FORECAST_URL}?lat=${latitude}&lon=${longitude}&appid=${key}`;

  const response = await fetch(urlCast);
  const dataForecast = await response.json();
  console.log(dataForecast);
  return dataForecast;
}

export async function getForecastBySearch(city) {
  const urlCast = `${FORECAST_URL}?q=${city}&appid=${key}`;

  const response = await fetch(urlCast);
  if (response.status === 200) {
    const dataForecast = await response.json();
    return dataForecast;
  } else {
    showError({ message: 'Cannot find city' });
  }
}
