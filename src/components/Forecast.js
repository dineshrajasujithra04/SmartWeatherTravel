import React from "react";

function Forecast({ forecast }) {
    if (!forecast || forecast.length === 0) {
        return null;
    }

    return (
        <div className="forecast-section">
            <h2>5-Day Forecast</h2>

            <div className="forecast-container">
                {forecast.map((day, index) => (
                    <div className="forecast-card" key={index}>
                        <h3>{day.date}</h3>

                        <div className="forecast-icon">
                            {day.icon}
                        </div>

                        <p>{day.condition}</p>

                        <p>
                            <strong>Max:</strong> {day.maxTemp} °C
                        </p>

                        <p>
                            <strong>Min:</strong> {day.minTemp} °C
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Forecast;