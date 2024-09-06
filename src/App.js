
import React, { useState } from 'react';
import './index.css';
import './App.css';
const API_KEY = "87b62d14b05d9cdd2b87dd2a759cc199";

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    setError('');
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await response.json();

      if (data.cod === 200) {
        setWeather({
          temperature: data.main.temp,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          description: data.weather[0].description,
        });
      } else {
        setError('City not found.');
        setWeather(null);
      }
    } catch (error) {
      setError('An error occurred while fetching the weather data.');
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <img src="/WeatherLogo.png" className="WeatherLogo" alt="Weather logo" />
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>Weather in {city}</h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind Speed: {weather.windSpeed} m/s</p>
          <p>Description: {weather.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
