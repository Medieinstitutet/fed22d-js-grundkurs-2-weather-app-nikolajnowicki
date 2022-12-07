import { displayWeather, key, showError } from './main.js';

const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

//========================================================================
// Gets weather information from OpenWeather API
//========================================================================

export async function getWeatherByLatLong(latitude, longitude) {
  const url = `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${key}`;

  const response = await fetch(url);
  const data = await response.json();

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
