// API Key
const API_KEY = "e194305aa7df487bbb7174116241411";
let isCelsius = true; // Default temperature unit
let currentLanguage = "en"; // Default language
const displayedCities = new Set(); // Track displayed cities
let cityList = []; // To store cities loaded from CSV

// DOM Elements
const cityInput = document.getElementById("cityInput");
const suggestionsContainer = document.getElementById("suggestions");
const favoritesContainer = document.getElementById("favoritesContainer");
const temperatureElement = document.getElementById("temperature");

// Load cities from CSV on page load
Papa.parse("worldcities.csv", {
  download: true,
  header: true,
  complete: function (results) {
    cityList = results.data;
  },
  error: function (error) {
    console.error("Error loading cities:", error);
  },
});

// Event listeners
document.getElementById("searchButton").addEventListener("click", fetchWeather);
cityInput.addEventListener("input", showSuggestions);
document.addEventListener("click", (e) => {
  if (!suggestionsContainer.contains(e.target) && e.target !== cityInput) {
    suggestionsContainer.classList.add("hidden");
  }
});
document.getElementById("unitToggle").addEventListener("change", toggleUnits);
document.getElementById("languageDropdown").addEventListener("change", setLanguage);
document.getElementById("darkModeToggle").addEventListener("change", () => {
  document.documentElement.classList.toggle("dark");
});

// Fetch weather data
function fetchWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&lang=${currentLanguage}&aqi=no`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) throw new Error("City not found. Please try again.");
      return response.json();
    })
    .then((data) => {
      updateWeatherUI(data);
      fetchNearbyCities(data.location.lat, data.location.lon);
      updateBackground(data.current.condition.text.toLowerCase());
    })
    .catch((error) => alert(error.message));
}

// Update weather UI
function updateWeatherUI(data) {
  document.getElementById("cityName").textContent = data.location.name;
  temperatureElement.textContent = `${data.current.temp_c}°C`;
  document.getElementById("description").textContent = data.current.condition.text;
  document.getElementById("humidity").textContent = `Humidity: ${data.current.humidity}%`;
  document.getElementById("wind").textContent = `Wind Speed: ${data.current.wind_kph} kph`;
  document.getElementById("weatherIcon").src = data.current.condition.icon;
  document.getElementById("weatherIcon").alt = data.current.condition.text;
}

// Fetch weather for nearby cities
function fetchNearbyCities(lat, lon) {
  const neighborsContainer = document.getElementById("neighborsContainer");
  neighborsContainer.innerHTML = "";
  const nearbyCoordinates = [
    { lat: lat + 0.1, lon },
    { lat: lat - 0.1, lon },
    { lat, lon: lon + 0.1 },
    { lat, lon: lon - 0.1 },
  ];

  nearbyCoordinates.forEach((coord) => {
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${coord.lat},${coord.lon}&aqi=no`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error("Error fetching nearby cities.");
        return response.json();
      })
      .then((data) => {
        if (!displayedCities.has(data.location.name)) {
          displayNeighborWeather(data);
          displayedCities.add(data.location.name);
        }
      })
      .catch((error) => console.error(error));
  });
}

// Display neighboring city's weather
function displayNeighborWeather(data) {
  const neighborsContainer = document.getElementById("neighborsContainer");
  const neighborCard = document.createElement("div");
  neighborCard.className = "bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-4 shadow-lg";
  neighborCard.innerHTML = `
    <h4 class="text-lg font-semibold">${data.location.name}</h4>
    <p class="text-2xl font-bold">${data.current.temp_c}°C</p>
    <p class="italic">${data.current.condition.text}</p>
    <p>Humidity: ${data.current.humidity}%</p>
    <p>Wind: ${data.current.wind_kph} kph</p>
    <img src="${data.current.condition.icon}" alt="${data.current.condition.text}" class="w-12 h-12 mx-auto mt-2">
  `;
  neighborsContainer.appendChild(neighborCard);
}

// Show city suggestions
function showSuggestions() {
  const query = cityInput.value.toLowerCase().trim();
  suggestionsContainer.innerHTML = "";
  if (query.length === 0) return;

  const filteredCities = cityList
    .filter((city) => city.city.toLowerCase().startsWith(query))
    .slice(0, 10);

  if (filteredCities.length > 0) {
    filteredCities.forEach((city) => {
      const suggestionItem = document.createElement("div");
      suggestionItem.className = "p-2 hover:bg-blue-100 cursor-pointer text-gray-800";
      suggestionItem.textContent = `${city.city}, ${city.country}`;
      suggestionItem.addEventListener("click", () => {
        cityInput.value = city.city;
        suggestionsContainer.classList.add("hidden");
        fetchWeather();
      });
      suggestionsContainer.appendChild(suggestionItem);
    });
    suggestionsContainer.classList.remove("hidden");
  }
}

// Save favorite city
function saveFavorite(city) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(city)) {
    favorites.push(city);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
  }
}

// Render favorite cities
function renderFavorites() {
  favoritesContainer.innerHTML = "";
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.forEach((city) => {
    const button = document.createElement("button");
    button.className = "bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer";
    button.textContent = city;
    button.addEventListener("click", () => {
      cityInput.value = city;
      fetchWeather();
    });
    favoritesContainer.appendChild(button);
  });
}

// Temperature unit toggle
function toggleUnits() {
  isCelsius = !isCelsius;
  const currentTemp = parseFloat(temperatureElement.textContent);
  temperatureElement.textContent = isCelsius
    ? `${((currentTemp - 32) * 5) / 9}°C`
    : `${(currentTemp * 9) / 5 + 32}°F`;
}

// Set language
function setLanguage(e) {
  currentLanguage = e.target.value;
  fetchWeather();
}

// Dynamic background
function updateBackground(condition) {
  const body = document.body;
  if (condition.includes("rain")) body.className = "bg-rain";
  else if (condition.includes("clear")) body.className = "bg-clear";
  else if (condition.includes("snow")) body.className = "bg-snow";
  else if (condition.includes("cloud")) body.className = "bg-clouds";
  else body.className = "bg-default";
}

// Load favorites on page load
renderFavorites();
