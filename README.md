# Weather App 🌦️

A web-based weather application that fetches weather information, displays nearby cities' weather, and includes various features like favorite cities, unit conversion, dynamic backgrounds, internationalization, and dark mode.

## Features
- Search for weather information by city name.
- Dynamic backgrounds based on weather conditions.
- Unit conversion between Celsius and Fahrenheit.
- Save favorite cities for quick access.
- Internationalization (supports multiple languages).
- Dark mode for better nighttime usability.
- Autocomplete suggestions for city names.

## Tech Stack
- **HTML**
- **CSS (Tailwind CSS)**
- **JavaScript**

## Installation and Setup

### Prerequisites
- Make sure you have **Node.js** installed. This is needed for setting up any packages if you plan to run a server or use certain scripts. You can download it from [Node.js](https://nodejs.org/).

### Installation
1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/Weather-App.git
Navigate into the project directory:

bash
Copy code
cd Weather-App
Install dependencies: If you are using any Node packages (like Tailwind or additional utilities):

bash
Copy code
npm install
Open index.html directly in your browser, or use a live server for the best experience.

Running the App
Option 1: Directly open index.html in a browser.

Option 2: Use a live server. If you have Visual Studio Code, you can use the Live Server extension:

Right-click on index.html and select Open with Live Server.
API Key
This project uses the WeatherAPI to fetch weather data. You need an API key to make requests.

Go to WeatherAPI and sign up to get a free API key.
Replace the placeholder in script.js with your API key:
javascript
Copy code
const API_KEY = "your_api_key_here";
CSV File (worldcities.csv)
The app uses worldcities.csv for autocomplete suggestions.
Ensure worldcities.csv is in the root directory, or update the file path in script.js.
Project Structure
index.html - Main HTML file.
styles.css - CSS file for additional styling.
script.js - JavaScript file containing all the app logic.
worldcities.csv - CSV file containing city data for autocomplete suggestions.
Customization
Background: Background colors dynamically update based on weather conditions.
Language: You can select a language from the dropdown for the weather information.
Unit Conversion: Toggle between Celsius and Fahrenheit.
Dark Mode: Toggle dark mode using the switch.
Deployment
You can deploy this app on GitHub Pages, Netlify, Vercel, or any static hosting platform.

Deploy on GitHub Pages
Go to Settings > Pages.
Select the branch (e.g., main) and folder (usually /root).
Click Save and GitHub Pages will provide a link to your app.
License
This project is open-source and available under the MIT License.
