// API Key
const API_KEY = "e194305aa7df487bbb7174116241411";

// Add event listener to the search button
document.getElementById("searchButton").addEventListener("click", fetchWeather);

function fetchWeather() {
  const city = document.getElementById("cityInput").value.trim();

  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  // Construct the API URL
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;

  // Fetch data from the API
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found. Please try again.");
      }
      return response.json();
    })
    .then((data) => {
      updateWeatherUI(data);
    })
    .catch((error) => {
      alert(error.message);
    });
}

// Update the weather display on the UI
function updateWeatherUI(data) {
    const cityName = document.getElementById("cityName");
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");
    const humidity = document.getElementById("humidity");
    const wind = document.getElementById("wind");
    const weatherIcon = document.getElementById("weatherIcon");
  
    cityName.textContent = data.location.name;
    temperature.textContent = `${data.current.temp_c}°C`;
    description.textContent = data.current.condition.text;
    humidity.textContent = `Humidity: ${data.current.humidity}%`;
    wind.textContent = `Wind Speed: ${data.current.wind_kph} kph`;
    weatherIcon.src = data.current.condition.icon;
    weatherIcon.alt = data.current.condition.text;
  
    // Add a brief animation to the temperature element
    temperature.classList.add("transform", "scale-110", "transition", "duration-200");
    setTimeout(() => {
      temperature.classList.remove("scale-110");
    }, 200);
  }