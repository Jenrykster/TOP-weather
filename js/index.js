const test = async () => {
  const data = await getWeatherData("London");
  console.log(data);
};

test();
