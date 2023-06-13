

import React, { useState } from 'react';
import './App.css';

const WeatherApp = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "d9462548ef2041da82d113619232405";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
      );

      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
        setError(null);
      } else {
        setError('Error fetching weather data');
      }
    } catch (error) {
      setError('Error fetching weather data');
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div>
      <h1>Weather Data Fetch</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter location"
        />
        <button type="submit">Fetch Weather</button>
      </form>

      {error && <p>{error}</p>}

      {weatherData && (
        <div>
          <h3>{weatherData.location.name + ', ' + weatherData.location.country}</h3>
          <p>Condition: {weatherData.current.condition.text}</p>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
