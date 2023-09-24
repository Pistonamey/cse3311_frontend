import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home'; // Make sure to import the Home component
import Photographer from './pages/Photographer'; 
import './App.css';


function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photographer/:name" element={<Photographer/>}/>
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
