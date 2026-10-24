import React from "react";

function TravelSuggestions({ weatherCode }) {
    if (weatherCode === null || weatherCode === undefined) {
        return null;
    }

    let suggestion = "";

    if (weatherCode === 0) {
        suggestion = "☀️ Great weather! Perfect for sightseeing and outdoor activities.";
    } else if (weatherCode === 1 || weatherCode === 2 || weatherCode === 3) {
        suggestion = "⛅ Good weather for sightseeing. You can plan outdoor activities.";
    } else if (weatherCode === 45 || weatherCode === 48) {
        suggestion = "🌫️ Foggy weather. Travel carefully and prefer nearby places.";
    } else if (weatherCode >= 51 && weatherCode <= 67) {
        suggestion = "🌧️ Rainy weather. Carry an umbrella and consider indoor attractions.";
    } else if (weatherCode >= 71 && weatherCode <= 77) {
        suggestion = "❄️ Cold and snowy weather. Wear warm clothes and travel safely.";
    } else if (weatherCode >= 80 && weatherCode <= 82) {
        suggestion = "🌦️ Rain showers expected. Carry an umbrella while travelling.";
    } else if (weatherCode >= 95) {
        suggestion = "⛈️ Thunderstorm expected. Avoid outdoor activities and travel carefully.";
    }

    return (
        <div className="travel-suggestions">
            <h2>Travel Suggestions</h2>
            <p>{suggestion}</p>
        </div>
    );
}

export default TravelSuggestions;