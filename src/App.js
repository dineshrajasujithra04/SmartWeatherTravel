import "./App.css";
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import TravelSuggestions from "./components/TravelSuggestions";
import ErrorMessage from "./components/ErrorMessage";

function App() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [code, setCode] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const searchWeather = async (e) => {
        e.preventDefault();

        if (!city.trim()) {
            setError("Please enter a city name.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const geoResponse = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city.trim())}&count=1`
            );

            if (!geoResponse.ok) {
                throw new Error("Unable to search for the city. Please try again.");
            }

            const locationData = await geoResponse.json();

            if (!locationData.results?.length) {
                throw new Error("City not found. Please enter a valid city name.");
            }

            const { latitude, longitude, name, country } = locationData.results[0];

            const weatherResponse = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5&timezone=auto`
            );

            if (!weatherResponse.ok) {
                throw new Error("Unable to retrieve weather data. Please try again.");
            }

            const data = await weatherResponse.json();

            if (!data.current || !data.daily) {
                throw new Error("Weather data is unavailable for this city.");
            }

            const weatherInfo = getInfo(data.current.weather_code);

            setWeather({
                city: name,
                country: country || "",
                temperature: data.current.temperature_2m,
                humidity: data.current.relative_humidity_2m,
                wind: data.current.wind_speed_10m,
                condition: weatherInfo.condition,
                icon: weatherInfo.icon
            });

            setCode(data.current.weather_code);

            setForecast(
                data.daily.time.map((date, index) => ({
                    date,
                    maxTemp: data.daily.temperature_2m_max[index],
                    minTemp: data.daily.temperature_2m_min[index],
                    ...getInfo(data.daily.weather_code[index])
                }))
            );
        } catch (err) {
            setWeather(null);
            setForecast([]);
            setCode(null);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app">
            <div className="container">
                <h1>Smart Weather & Travel Dashboard</h1>

                <p className="subtitle">
                    Check current weather, explore forecasts, and discover travel suggestions.
                </p>

                <SearchBar
                    city={city}
                    setCity={setCity}
                    onSearch={searchWeather}
                />

                {loading && <p className="loading">Loading weather information...</p>}

                <ErrorMessage message={error} />

                <WeatherCard weather={weather} />

                <Forecast forecast={forecast} />

                <TravelSuggestions weatherCode={code} />

                <footer className="app-footer">
                    <p>
                        Powered by Open-Meteo Weather API
                    </p>
                    <a
                        href="https://smart-weather-travel.onrender.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Open Live Demo
                    </a>
                </footer>
            </div>
        </div>
    );
}

function getInfo(code) {
    if (code === 0) {
        return { condition: "Clear Sky", icon: "☀️" };
    }

    if ([1, 2, 3].includes(code)) {
        return { condition: "Partly Cloudy", icon: "⛅" };
    }

    if ([45, 48].includes(code)) {
        return { condition: "Foggy", icon: "🌫️" };
    }

    if ([51, 53, 55, 56, 57].includes(code)) {
        return { condition: "Drizzle", icon: "🌦️" };
    }

    if ([61, 63, 65, 66, 67].includes(code)) {
        return { condition: "Rain", icon: "🌧️" };
    }

    if ([71, 73, 75, 77, 85, 86].includes(code)) {
        return { condition: "Snow", icon: "❄️" };
    }

    if ([80, 81, 82].includes(code)) {
        return { condition: "Rain Showers", icon: "🌦️" };
    }

    if ([95, 96, 99].includes(code)) {
        return { condition: "Thunderstorm", icon: "⛈️" };
    }

    return { condition: "Unknown Weather", icon: "🌤️" };
}

export default App;