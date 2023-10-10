const searchInput = document.querySelector(".search-input");
const searchForm = document.querySelector("[data-searchForm]");
const API_KEY = import.meta.env.VITE_API_KEY;

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let cityName = searchInput.value;
  searchWeatherInfo(cityName);
});

async function searchWeatherInfo(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    const data = await response.json();
    renderWeatherInfo(data);
  } catch (error) {
    console.log(error);
  }
}

function renderWeatherInfo(weatherInfo) {
  console.log(weatherInfo);

  const countryName = document.querySelector(".country");
  const countryIcon = document.querySelector(".countryIcon");
  const weather = document.querySelector(".weather");
  const weatherIcon = document.querySelector(".weatherIcon");
  const weatherTemperature = document.querySelector(".weatherTemp");
  const windSpeed = document.querySelector(".windSpeed");
  const humidity = document.querySelector(".humidity");
  const cloud = document.querySelector(".cloud");
  console.log(countryIcon);

  countryName.innerHTML = weatherInfo.name;
  countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
  weather.innerHTML = weatherInfo.weather?.[0]?.main;
  weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
  weatherTemperature.innerHTML = weatherInfo.main?.temp;
  windSpeed.innerHTML = `${weatherInfo.wind?.speed}m/s`;
  humidity.innerHTML = `${weatherInfo.main?.humidity}%`;
  cloud.innerHTML = `${weatherInfo.clouds?.all}%`;
}
