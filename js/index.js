const backgroundComponent = document.querySelector("#mainContainer");
backgroundComponent.style.backgroundImage = SVG_BACKGROUNDS.default;

const textInput = document.querySelector("#cityInput");
const searchButton = document.querySelector("#searchButton");
const loadingAnimation = searchButton.querySelector("#loadingAnimation");
const buttonText = searchButton.querySelector("p");
const weatherInfoContainer = document.querySelector("#weatherInfo");

let currSelectedUnit = "c";

const convertToTemperatureUnit = (unit, value) => {
  let newValue;
  if (unit.toUpperCase() === "C") {
    newValue = (value - 32) * (5 / 9);
  } else if (unit.toUpperCase() === "F") {
    newValue = value * (9 / 5) + 32;
  } else {
    return value;
  }
  return Math.round(newValue);
};

const toggleSelectedUnit = (event) => {
  currSelectedUnit = currSelectedUnit === "c" ? "f" : "c";
  const currTemperature = event.target.innerHTML.match(/\d+/)[0];
  console.log(currTemperature, currSelectedUnit);
  event.target.innerHTML =
    convertToTemperatureUnit(currSelectedUnit, currTemperature) +
    "º" +
    currSelectedUnit.toUpperCase();
};

const getCityInputWeatherData = async () => {
  const cityName = textInput.value;
  if (cityName.trim() === "") {
    alert("The city name cannot be empty");
    return;
  }
  loadCityWeather(cityName);
};

const loadCityWeather = async (cityName) => {
  buttonText.style.display = "none";
  loadingAnimation.style.display = "block";

  try {
    const currCityWeatherData = await getWeatherData(cityName);
    changeInterface(currCityWeatherData);
    showWeatherInfo(currCityWeatherData);
  } catch (err) {
    console.log(err);
    alert("There was an error getting the data");
  }

  buttonText.style.display = "block";
  loadingAnimation.style.display = "none";
};

const temperature = document.querySelector("#temperature");
temperature.addEventListener("click", toggleSelectedUnit);

const cityName = document.querySelector("#cityName");
const weatherImage = document.querySelector("#cityName");

const showWeatherInfo = (weatherData) => {
  let temp = weatherData.temperature;
  if (currSelectedUnit === "f") {
    temp = convertToTemperatureUnit("f", weatherData.temperature);
  }
  const converttedTemp = temp + "º" + currSelectedUnit.toUpperCase();
  temperature.innerHTML = converttedTemp;

  cityName.innerHTML = weatherData.cityName;
  weatherInfoContainer.style.transform = "scaleY(1)";
};

const changeInterface = (weatherData) => {
  switch (weatherData.weather.main) {
    case "Clouds":
      backgroundComponent.style.backgroundImage = SVG_BACKGROUNDS.cloudy;
      break;
    case "Rain":
      backgroundComponent.style.backgroundImage = SVG_BACKGROUNDS.rainy;
      break;
    case "Snow":
      backgroundComponent.style.backgroundImage = SVG_BACKGROUNDS.snowy;
      break;
    default:
      backgroundComponent.style.backgroundImage = SVG_BACKGROUNDS.default;
      break;
  }
};

searchButton.addEventListener("click", getCityInputWeatherData);
