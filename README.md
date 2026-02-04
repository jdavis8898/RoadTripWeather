# RoadTripWeather

A React application that helps you check weather along your road trip journey. The app provides two different methods for inputting locations and times to get weather forecasts.

## Features

### Two Input Methods
- **Text Input Tab**: Enter locations and times manually using text fields
- **Map Input Tab**: Drop pins on an interactive map to select locations

### Core Functionality
- Add multiple locations with associated times
- View weather forecasts for each location
- Remove locations you don't need
- Clean, responsive user interface

## Screenshots

### Text Input Tab
![Text Input Tab](https://github.com/user-attachments/assets/c0d61caa-550b-4ab1-9b66-746d2ef08a71)

### Map Input Tab
![Map Input Tab](https://github.com/user-attachments/assets/b33f5798-1c45-41f4-b82d-6bbed1a6ee64)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jdavis8898/RoadTripWeather.git
cd RoadTripWeather
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

### Build for Production

To create a production build:
```bash
npm run build
```

## Usage

### Text Input Tab
1. Enter a location (e.g., "New York, NY") in the location field
2. Select a date and time for that location
3. Click "+ Add Location" to add more locations
4. Click "Get Weather" to fetch weather forecasts
5. View the weather cards showing temperature, conditions, humidity, and wind speed

### Map Input Tab
1. Click on the map to drop pins at your desired locations
2. Set the time for each pin in the locations list
3. Click "Get Weather" to fetch weather forecasts
4. View the weather cards for each pin location

## Technologies Used

- **React** - Frontend framework
- **React-Leaflet** - Interactive map component
- **Leaflet** - Map rendering library
- **OpenStreetMap** - Map tiles provider
- **Create React App** - Project scaffolding

## Project Structure

```
RoadTripWeather/
├── public/
├── src/
│   ├── components/
│   │   ├── TextInputTab.js      # Text-based location input
│   │   ├── TextInputTab.css
│   │   ├── MapInputTab.js       # Map-based location input
│   │   └── MapInputTab.css
│   ├── App.js                   # Main app component with tabs
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Future Enhancements

- Integration with real weather API (e.g., OpenWeatherMap, Weather.gov)
- Reverse geocoding for map pins to show location names
- Route visualization on map
- Save/load trip plans
- Export weather data
- Multiple temperature units (Fahrenheit/Celsius)

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
