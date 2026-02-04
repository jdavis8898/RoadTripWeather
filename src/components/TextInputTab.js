import React, { useState } from 'react';
import './TextInputTab.css';

const TextInputTab = () => {
  const [locations, setLocations] = useState([
    { id: 1, location: '', time: '' }
  ]);
  const [weatherResults, setWeatherResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addLocation = () => {
    const newId = locations.length > 0 ? Math.max(...locations.map(l => l.id)) + 1 : 1;
    setLocations([...locations, { id: newId, location: '', time: '' }]);
  };

  const updateLocation = (id, field, value) => {
    setLocations(locations.map(loc => 
      loc.id === id ? { ...loc, [field]: value } : loc
    ));
  };

  const removeLocation = (id) => {
    if (locations.length > 1) {
      setLocations(locations.filter(loc => loc.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validLocations = locations.filter(loc => loc.location.trim() && loc.time.trim());
    if (validLocations.length === 0) {
      alert('Please enter at least one location and time');
      return;
    }
    fetchWeatherForLocations(validLocations);
  };

  const fetchWeatherForLocations = async (locationsToFetch) => {
    setLoading(true);
    setWeatherResults([]);
    
    // Simulate API call - in production, replace with actual weather API
    try {
      const results = await Promise.all(
        locationsToFetch.map(async (loc) => {
          // Mock weather data
          await new Promise(resolve => setTimeout(resolve, 500));
          return {
            id: loc.id,
            location: loc.location,
            time: loc.time,
            temperature: Math.floor(Math.random() * 30) + 50,
            condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
            humidity: Math.floor(Math.random() * 40) + 40,
            windSpeed: Math.floor(Math.random() * 20) + 5
          };
        })
      );
      setWeatherResults(results);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
    setLoading(false);
  };

  return (
    <div className="text-input-tab">
      <h2>Enter Locations and Times</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-list">
          {locations.map((loc) => (
            <div key={loc.id} className="input-row">
              <input
                type="text"
                placeholder="Location (e.g., New York, NY)"
                value={loc.location}
                onChange={(e) => updateLocation(loc.id, 'location', e.target.value)}
                className="location-input"
              />
              <input
                type="datetime-local"
                value={loc.time}
                onChange={(e) => updateLocation(loc.id, 'time', e.target.value)}
                className="time-input"
              />
              {locations.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLocation(loc.id)}
                  className="remove-button"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        
        <div className="button-group">
          <button type="button" onClick={addLocation} className="add-button">
            + Add Location
          </button>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Loading...' : 'Get Weather'}
          </button>
        </div>
      </form>

      {weatherResults.length > 0 && (
        <div className="weather-results">
          <h3>Weather Forecast</h3>
          <div className="results-grid">
            {weatherResults.map((result) => (
              <div key={result.id} className="weather-card">
                <h4>{result.location}</h4>
                <p className="time">{new Date(result.time).toLocaleString()}</p>
                <div className="weather-info">
                  <p className="temperature">{result.temperature}°F</p>
                  <p className="condition">{result.condition}</p>
                  <p>Humidity: {result.humidity}%</p>
                  <p>Wind: {result.windSpeed} mph</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TextInputTab;
