import React from "react";

function WeatherCard({ weather }) {
    if (!weather) {
        return null;
    }

    return (
        <div className="weather-card">
            <h2>
                {weather.city}, {weather.country}
            </h2>

            <div className="weather-icon">
                {weather.icon}
            </div>

            <h3>{weather.temperature} °C</h3>

            <p>{weather.condition}</p>

            <div className="weather-details">
                <div>
                    <strong>Humidity</strong>
                    <p>{weather.humidity}%</p>
                </div>

                <div>
                    <strong>Wind Speed</strong>
                    <p>{weather.wind} km/h</p>
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;