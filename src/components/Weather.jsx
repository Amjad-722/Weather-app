import React, { useState, useEffect } from "react";
import "./Weather.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import clear_icon from "../assets/clear.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  // State to store weather data and the city being searched
  const [city, setCity] = useState("London");
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    location: null,
    humidity: null,
    windSpeed: null,
    icon: clear_icon, // default icon
  });

  // Function to fetch weather data from the API
  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();

      // Update weather data state with API response
      setWeatherData({
        temperature: data.main.temp,
        location: data.name,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Fetch weather data for the default city when the component mounts
  useEffect(() => {
    search("London");
  }, []);

  // Handle input change to update city state
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  // Handle search when Enter key is pressed or button is clicked
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      search(city);
    }
  };

  const handleSearchClick = () => {
    search(city);
  };

  return (
    <div className="weather">
      <div className="serch-bar">
        <input
          type="text"
          placeholder="search"
          value={city}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearchClick}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className="img" />
        </button>
      </div>
      
      {/* Display weather data dynamically */}
      {weatherData.location && (
        <div>
          <img src={weatherData.icon} alt="Weather Icon" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity icon" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind speed icon" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
