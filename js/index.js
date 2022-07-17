const backgroundComponent = document.querySelector("#mainContainer");
backgroundComponent.style.backgroundImage = SVG_BACKGROUNDS.default;

const textInput = document.querySelector("#cityInput");
const searchButton = document.querySelector("#searchButton");
const loadingAnimation = searchButton.querySelector("#loadingAnimation");
const buttonText = searchButton.querySelector("p");

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
    console.log(currCityWeatherData);
  } catch (err) {
    alert("There was an error getting the data");
  }

  buttonText.style.display = "block";
  loadingAnimation.style.display = "none";
};

searchButton.addEventListener("click", getCityInputWeatherData);
