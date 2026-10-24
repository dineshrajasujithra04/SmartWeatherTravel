import './App.css';
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
        if (!city.trim()) return setError("Please enter a city name.");

        setLoading(true);
        setError("");

        try {
            const geo = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
            );
            const location = await geo.json();

            if (!location.results?.length) throw new Error("City not found.");

            const { latitude, longitude, name, country } = location.results[0];

            const res = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5&timezone=auto`
            );
            const data = await res.json();

            const info = getInfo(data.current.weather_code);

            setWeather({
                city: name,
                country,
                temperature: data.current.temperature_2m,
                humidity: data.current.relative_humidity_2m,
                wind: data.current.wind_speed_10m,
                condition: info.condition,
                icon: info.icon
            });

            setCode(data.current.weather_code);

            setForecast(data.daily.time.map((date, i) => ({
                date,
                maxTemp: data.daily.temperature_2m_max[i],
                minTemp: data.daily.temperature_2m_min[i],
                ...getInfo(data.daily.weather_code[i])
            })));
        } catch (err) {
            setError(err.message);
        }

        setLoading(false);
    };

    return (
        <div className="app">
            <div className="container">
                <h1>Smart Weather & Travel Dashboard</h1>
                <SearchBar city={city} setCity={setCity} onSearch={searchWeather} />
                {loading && <p className="loading">Loading...</p>}
                <ErrorMessage message={error} />
                <WeatherCard weather={weather} />
                <Forecast forecast={forecast} />
                <TravelSuggestions weatherCode={code} />
            </div>
        </div>
    );
}

function getInfo(code) {
    if (code === 0) return { condition: "Clear Sky", icon: "☀️" };
    if (code <= 3) return { condition: "Cloudy", icon: "⛅" };
    if (code <= 48) return { condition: "Foggy", icon: "🌫️" };
    if (code <= 67) return { condition: "Rain", icon: "🌧️" };
    if (code <= 77) return { condition: "Snow", icon: "❄️" };
    if (code <= 82) return { condition: "Rain Showers", icon: "🌦️" };
    return { condition: "Thunderstorm", icon: "⛈️" };
}

export default App;