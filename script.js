document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "19de3233f9aca4c5d8161de42576fbe6";

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    
    console.log(city);
    if (!city) return;

    //it may throw an error
    // server/database is always in another continent

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError(error.message);
    }
  });

  async function fetchWeatherData(city) {
    //gets the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    //const result = await response.json();
    console.log(typeof response);
    console.log("RESPONSE", response.status);

    if (!response.ok) {
      throw new Error("City Not Found");
    }

    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    console.log(data);
    //display
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature: ${main.temp} `;
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`;

    //unlock display
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError(message) {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
     errorMessage.textContent = message || "An error occurred.";
  }
});
