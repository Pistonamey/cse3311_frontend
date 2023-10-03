// Import necessary React and ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the main App component from the local App.js file
import App from './App';

// Create a root concurrent React DOM container using the element with id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the main App component inside the concurrent root container 
// within the React's StrictMode to highlight potential problems
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
