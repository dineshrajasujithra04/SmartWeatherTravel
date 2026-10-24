# Smart Weather & Travel Dashboard

A React-based web application that allows users to search for cities, view current weather conditions, explore a five-day weather forecast, and receive travel suggestions based on weather conditions.

## Live Demo

**Application:** https://smart-weather-travel.onrender.com

## Project Overview

The Smart Weather & Travel Dashboard combines weather information and travel suggestions in a single, user-friendly interface.

Users can enter a city name to retrieve its geographical coordinates and obtain weather information through the Open-Meteo API. The application displays current weather conditions, temperature, humidity, wind speed, and a five-day forecast.

The dashboard also provides travel suggestions based on the reported weather conditions, helping users make more informed travel plans.

## Features

* Search for cities by name.
* Retrieve geographical coordinates using the Open-Meteo Geocoding API.
* Display current temperature and weather conditions.
* Show relative humidity and wind speed.
* Display a five-day weather forecast.
* Present weather conditions using descriptive labels and icons.
* Provide weather-based travel suggestions.
* Display loading indicators while retrieving information.
* Handle invalid city names and API errors.
* Provide a responsive React-based user interface.

## Technologies Used

* React.js
* JavaScript
* HTML5
* CSS3
* Open-Meteo Geocoding API
* Open-Meteo Weather Forecast API
* Git and GitHub
* Render

## Project Structure

```text
SmartWeatherTravel/
├── public/
├── src/
│   ├── components/
│   │   ├── SearchBar.js
│   │   ├── WeatherCard.js
│   │   ├── Forecast.js
│   │   ├── TravelSuggestions.js
│   │   └── ErrorMessage.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
├── package-lock.json
└── README.md
```

The component filenames shown above are examples. Keep the actual filenames and folder structure used in your repository.

## APIs Used

### Open-Meteo Geocoding API

Used to find a city's geographical coordinates from its name.

API endpoint:

`https://geocoding-api.open-meteo.com/v1/search`

### Open-Meteo Weather Forecast API

Used to retrieve current weather information and a five-day forecast.

API endpoint:

`https://api.open-meteo.com/v1/forecast`

Open-Meteo provides the weather data used by the application.

Website: https://open-meteo.com/

## Installation and Setup

### Prerequisites

Install the following software before running the project locally:

* Node.js
* npm
* Visual Studio Code

### Step 1: Clone the Repository

Open Command Prompt and execute:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with the actual HTTPS URL of your GitHub repository.

### Step 2: Open the Project Folder

Navigate to the cloned project directory:

```bash
cd SmartWeatherTravel
```

If your repository uses a different folder name, enter that folder name instead.

### Step 3: Install Dependencies

Run:

```bash
npm install
```

### Step 4: Start the Application

Run:

```bash
npm start
```

For a Create React App project, the application will usually open at:

`http://localhost:3000`

If your project uses Vite instead, check the scripts in `package.json` and use the appropriate development command, usually `npm run dev`.

## Production Build

For a Create React App project, generate a production build using:

```bash
npm run build
```

The production files will be created in the `build` directory.

For a Vite project, the production output is normally generated in the `dist` directory.

## Deployment

The application is deployed using Render as a static website.

Live URL:

https://smart-weather-travel.onrender.com

To deploy updates:

1. Save the latest project changes.
2. Commit the changes to Git.
3. Push the changes to the connected GitHub repository.
4. Allow Render to build and deploy the updated application.
5. Open the live URL and verify the application.

## Error Handling

The application handles common errors, including:

* Empty city searches.
* Invalid or unavailable city names.
* Weather API request failures.
* Missing weather information.
* Loading states while data is being retrieved.

## Future Enhancements

* Add a seven-day weather forecast.
* Display weather maps and interactive charts.
* Add location-based weather detection.
* Include travel destinations and recommended activities.
* Provide additional weather alerts.
* Improve mobile responsiveness and accessibility.

## Author

Developed as a web development project using React.js and the Open-Meteo API.

## License

This project is intended for educational and demonstration purposes. Check the applicable API terms before using the application commercially.
