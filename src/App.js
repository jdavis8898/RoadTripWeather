import React, { useState } from 'react';
import './App.css';
import TextInputTab from './components/TextInputTab';
import MapInputTab from './components/MapInputTab';

function App() {
  const [activeTab, setActiveTab] = useState('text');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Road Trip Weather</h1>
        <p>Check weather along your journey</p>
      </header>
      
      <div className="tabs">
        <button 
          className={`tab-button ${activeTab === 'text' ? 'active' : ''}`}
          onClick={() => setActiveTab('text')}
        >
          Text Input
        </button>
        <button 
          className={`tab-button ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          Map Input
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'text' ? <TextInputTab /> : <MapInputTab />}
      </div>
    </div>
  );
}

export default App;
