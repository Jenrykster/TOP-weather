const WEATHER_API_TOKEN = "49aee2e7ba28da46c3b8608671ca9279";

const getLocationCurrentWeather = async (cityName) => {
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WEATHER_API_TOKEN}`;
  const response = await fetch(weatherURL);
  const weatherData = response.json();
  return weatherData;
};

const parseWeather = (weatherData) => {
  return {
    weather: weatherData.weather[0],
    temperature: weatherData.main.temp,
  };
};

const getWeatherData = async (cityName) => {
  const weatherAPIInfo = await getLocationCurrentWeather(cityName);
  const weatherData = parseWeather(weatherAPIInfo);
  return weatherData;
};
