import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import Photographer from './pages/Photographer';
import Booking from './pages/Booking';
import RequestBooking from './pages/RequestBooking';
import Proposal from './pages/Proposal';

// Import individual page components
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import jwt_decode from 'jwt-decode';
import MenuSidebar from './components/MenuSidebar';
import UploadPhoto from './pages/UploadPhoto';
import Forgot_Password from './pages/Forgot_Password';
import Reset_Password from './pages/Reset_password';
import Verify2FA from './pages/Verify2FA';
import Google_OAuth from './pages/Google_OAuth';
import Profile from './components/Profile';
import Commenting from './pages/Commenting';
import User_Profile from './pages/User_Profile';
import Cookies from 'js-cookie';
import FilteredPhotos from './pages/FilteredPhotos';
// Define the main App component
function App() {
  let isAuthenticated = false;

  // Check if the JWT token is present in localStorage and is valid
  const token = Cookies.get('token')

  if (token) {
    try {
      const decodedToken = jwt_decode(token);

      // Check if the token is not expired
      if (decodedToken.exp > Date.now() / 1000) {
        isAuthenticated = true;
      } else {
        // Token has expired, log the user out
        //isAuthenticated = false;
        isAuthenticated = false
        localStorage.removeItem('jwtToken');
      }
    } catch (error) {
      // Token is invalid, log the user out
      //isAuthenticated = false;
      isAuthenticated = false
      localStorage.removeItem('jwtToken');
    }
  }

  // Get the current route
  const currentRoute = window.location.pathname;

  // Check if the current route is / (login) or /signup
  const isLoginPage = currentRoute === '/';
  const isRegisterPage = currentRoute === '/signup';

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
            <Route path="/signup" element={<Register />} />
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
              path="/user_profile"
              element={
                <PrivateRoute
                  element={<User_Profile />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/list"
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute
                  element={<Profile />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/upload_photo"
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
            <Route path="/google_oauth" element={<Google_OAuth/>}/>
            <Route
              path="/verify2FA"
              element={<Verify2FA />}
            />
            <Route
              path="/reset_password/:token"
              element={<Reset_Password />}
            />
            <Route
              path="/"
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
            <Route
              path="/forgot_password"
              element={<Forgot_Password/>}
            />
            {/* Photographer profile page (with dynamic "name" parameter) */}
            <Route
              path="/photographer/:name"
              element={
                <PrivateRoute
                  element={<Photographer />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            {/* Booking page under a specific photographer (with dynamic "name" parameter) */}
            <Route
              path="/photographer/:name/Booking"
              element={
                <PrivateRoute
                  element={<Booking />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
              <Route
              path="/request_booking"
              element={<RequestBooking />}
              />

              <Route
              path="/proposal/:quote_id"
              element={<Proposal />}
              />
              
            {/*add pages here*/}
            <Route
              path="/filtered"
              element={
                <PrivateRoute
                  element={<FilteredPhotos />}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
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
