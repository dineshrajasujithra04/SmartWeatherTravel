import React from "react";

function SearchBar({ city, setCity, onSearch }) {
    return (
        <form onSubmit={onSearch} className="search-box">
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(event) => setCity(event.target.value)}
            />

            <button type="submit">
                Search
            </button>
        </form>
    );
}

export default SearchBar;