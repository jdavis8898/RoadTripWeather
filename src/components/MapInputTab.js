import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapInputTab.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
    },
  });
  return null;
}

const MapInputTab = () => {
  const [markers, setMarkers] = useState([]);
  const [weatherResults, setWeatherResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMapClick = (latlng) => {
    const newId = markers.length > 0 ? Math.max(...markers.map(m => m.id)) + 1 : 1;
    setMarkers([...markers, {
      id: newId,
      lat: latlng.lat,
      lng: latlng.lng,
      time: '',
      location: `${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}`
    }]);
  };

  const updateMarkerTime = (id, time) => {
    setMarkers(markers.map(marker =>
      marker.id === id ? { ...marker, time } : marker
    ));
  };

  const removeMarker = (id) => {
    setMarkers(markers.filter(marker => marker.id !== id));
    if (selectedMarker === id) {
      setSelectedMarker(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validMarkers = markers.filter(marker => marker.time.trim());
    if (validMarkers.length === 0) {
      alert('Please add at least one pin and set its time');
      return;
    }
    fetchWeatherForMarkers(validMarkers);
  };

  const fetchWeatherForMarkers = async (markersToFetch) => {
    setLoading(true);
    setWeatherResults([]);
    
    // Simulate API call - in production, replace with actual weather API
    try {
      const results = await Promise.all(
        markersToFetch.map(async (marker) => {
          // Mock weather data
          await new Promise(resolve => setTimeout(resolve, 500));
          return {
            id: marker.id,
            location: marker.location,
            time: marker.time,
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
    <div className="map-input-tab">
      <h2>Drop Pins on Map</h2>
      <p className="instructions">Click on the map to drop pins at your locations</p>
      
      <div className="map-container-wrapper">
        <MapContainer
          center={[39.8283, -98.5795]} // Center of USA
          zoom={4}
          className="map-container"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler onMapClick={handleMapClick} />
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={[marker.lat, marker.lng]}
              eventHandlers={{
                click: () => setSelectedMarker(marker.id)
              }}
            >
              <Popup>
                <div className="popup-content">
                  <strong>Location {marker.id}</strong>
                  <p>{marker.location}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {markers.length > 0 && (
        <div className="markers-list">
          <h3>Locations ({markers.length})</h3>
          {markers.map((marker) => (
            <div key={marker.id} className="marker-item">
              <div className="marker-info">
                <strong>Pin {marker.id}:</strong> {marker.location}
              </div>
              <input
                type="datetime-local"
                value={marker.time}
                onChange={(e) => updateMarkerTime(marker.id, e.target.value)}
                className="time-input"
                placeholder="Set time"
              />
              <button
                onClick={() => removeMarker(marker.id)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
          
          <div className="submit-section">
            <button onClick={handleSubmit} className="submit-button" disabled={loading}>
              {loading ? 'Loading...' : 'Get Weather'}
            </button>
          </div>
        </div>
      )}

      {weatherResults.length > 0 && (
        <div className="weather-results">
          <h3>Weather Forecast</h3>
          <div className="results-grid">
            {weatherResults.map((result) => (
              <div key={result.id} className="weather-card">
                <h4>Pin {result.id}</h4>
                <p className="location-coords">{result.location}</p>
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

export default MapInputTab;
