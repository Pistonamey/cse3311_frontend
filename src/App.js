// Import necessary dependencies
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

// Import individual page components
import Home from './pages/Home';
import Photographer from './pages/Photographer';
import Booking from './pages/Booking'; 
import Login from './pages/Login';
import Register from './pages/Register';

// Import CSS for styling
import './App.css';

// Define the main App component
function App() {
  return (
    <div className="app">
      {/* Wrap the entire app inside the Router component to enable routing */}
      <Router>
        {/* Define routes for the app */}
        <Routes>
          {/* Login page (set as the default route) */}
          <Route path="/" element={<Login />} />
          {/* Login page (explicit path) */}
          <Route path="/login" element={<Login />} />
          {/* Register page */}
          <Route path="/register" element={<Register />} />
          {/* Home page */}
          <Route path="/home" element={<Home />} />
          {/* Photographer profile page (with dynamic "name" parameter) */}
          <Route path="/photographer/:name" element={<Photographer/>}/>
          {/* Booking page under a specific photographer (with dynamic "name" parameter) */}
          <Route path="/photographer/:name/Booking" element={<Booking/>}/>
          {/* You can add more routes here as your app grows */}
        </Routes>
      </Router>
    </div>
  );
}

// Export the App component to be used in the larger application
export default App;
