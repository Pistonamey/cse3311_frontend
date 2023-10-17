import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Home from './pages/Home'; // Make sure to import the Home component
import Photographer from './pages/Photographer';
import Booking from './pages/Booking';
import Commenting from './pages/Commenting';



// Import individual page components
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import jwt_decode from 'jwt-decode';
import MenuSidebar from './components/MenuSidebar';
import UploadPhoto from './pages/UploadPhoto';

// Define the main App component
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the JWT token is present in localStorage and is valid
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      console.log(token);
      try {
        const decodedToken = jwt_decode(token);

        // Check if the token is not expired
        if (decodedToken.exp > Date.now() / 1000) {
          setIsAuthenticated(true);
        } else {
          // Token has expired, log the user out
          setIsAuthenticated(false);
          localStorage.removeItem('jwtToken');
        }
      } catch (error) {
        // Token is invalid, log the user out
        setIsAuthenticated(false);
        localStorage.removeItem('jwtToken');
      }
    }
  }, []);

  // Get the current route
  const currentRoute = window.location.pathname;

  // Check if the current route is / (login) or /register
  const isLoginPage = currentRoute === '/';
  const isRegisterPage = currentRoute === '/register';

  return (
    <Router>
      <div className="app">
        {/* Conditionally render the MenuSidebar only if the user is authenticated */}
        {isAuthenticated && !isLoginPage && !isRegisterPage && <MenuSidebar />}
        <main className="content">
          {/* Wrap the entire app inside the Router component to enable routing */}
          {/* Define routes for the app */}
          <Routes>
            {/* Login page (set as the default route) */}
            <Route path="/" element={<Login />} />

            {/* Login page (explicit path) */}
            {/* <Route path="/login" element={<Login />} /> */}
            {/* Register page */}
            <Route path="/register" element={<Register />} />
            {/* Home page */}
            <Route
              path="/home"
              element={
                <PrivateRoute
                  element={<Home />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/upload-photo"
              element={
                isAuthenticated ? (
                  <PrivateRoute
                    element={<UploadPhoto />}
                    isAuthenticated={isAuthenticated}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <PrivateRoute
                    element={<Login />}
                    isAuthenticated={isAuthenticated}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            {/* Photographer profile page (with dynamic "name" parameter) */}
            <Route path="/photographer/:name" element={<Photographer />} />
            {/* Booking page under a specific photographer (with dynamic "name" parameter) */}
            <Route path="/photographer/:name/Booking" element={<Booking />} />
            <Route path="/photographer/:name/:photoid" element={<Commenting />} />
            {/* You can add more routes here as your app grows */}
          </Routes>
        </main>
      </div>
    </Router>

  );
}

// Export the App component to be used in the larger application
export default App;
