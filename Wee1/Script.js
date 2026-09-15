const apiKey = "716d6397c445cd9ca8078d8470df62fa";


const popularCities = [
    "London", "New York", "Tokyo", "Paris", "Sydney",
    "Dubai", "Singapore", "Toronto", "Berlin", "Mumbai"
];

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");
const errorMsg = document.getElementById("errorMsg");

const cityNameEl = document.getElementById("cityName");
const temperatureEl = document.getElementById("temperature");
const conditionEl = document.getElementById("condition");
const humidityEl = document.getElementById("humidity");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    }
});

cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeatherData(city);
        }
    }
});

function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then((data) => {
            displayWeather(data);
        })
        .catch((error) => {
            showError();
        });
}

function displayWeather(data) {
    errorMsg.classList.add("hidden");

    cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
    temperatureEl.textContent = Math.round(data.main.temp);
    conditionEl.textContent = data.weather[0].description;
    humidityEl.textContent = `${data.main.humidity}%`;

    weatherResult.classList.remove("hidden");
}

function showError() {
    weatherResult.classList.add("hidden");
    errorMsg.classList.remove("hidden");
}