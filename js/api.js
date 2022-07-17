const WEATHER_API_TOKEN = "49aee2e7ba28da46c3b8608671ca9279";
const GIPHY_API_TOKEN = "SKTFWlmpsg4QefubJZ7JPX6TmBv8kA7X";

const getLocationCurrentWeather = async (cityName) => {
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WEATHER_API_TOKEN}&units=metric`;
  const response = await fetch(weatherURL);
  const weatherData = response.json();
  return weatherData;
};

const parseWeather = async (weatherData) => {
  const giphyResponse = await fetch(
    `https://api.giphy.com/v1/gifs/translate?s=${weatherData.weather[0].main}&api_key=${GIPHY_API_TOKEN}`
  );
  const giphyJSON = await giphyResponse.json();

  console.log(giphyJSON);
  return {
    weather: weatherData.weather[0],
    temperature: Math.ceil(weatherData.main.temp),
    cityName: weatherData.name,
    gif: giphyJSON.data.images.original.url,
  };
};

const getWeatherData = async (cityName) => {
  const weatherAPIInfo = await getLocationCurrentWeather(cityName);
  const weatherData = await parseWeather(weatherAPIInfo);
  return weatherData;
};
