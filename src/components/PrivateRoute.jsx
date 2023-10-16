import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Custom PrivateRoute component
function PrivateRoute({ element, isAuthenticated }) {
  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/" replace />
  );
}

export default PrivateRoute;
