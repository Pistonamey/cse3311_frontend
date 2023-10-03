// Import necessary React library and react-router's Link component
import React from 'react';
import { Link } from 'react-router-dom';

// Define the PhotoGrid functional component which takes in photos and photographerName as props
function PhotoGrid({ photos, photographerName }) {
  return (
    // Outer div for grid layout of photos
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
      gap: '16px', 
      marginBottom: "18px" 
    }}>
      {/* Map through the list of photos and render each photo */}
      {photos.map((photo, index) => (
        // Individual photo container
        <div key={photo.id} style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-start' 
        }}>
          {/* Container for the photographer's name */}
          <div style={{ 
            height: '30px', 
            marginBottom: index === 0 ? '0px' : '0' 
          }}>
            {/* Only display the photographer's name on the first photo */}
            {index === 0 && (
              // Link to the photographer's profile page
              <Link 
                to={`/photographer/${photographerName}`} 
                style={{ color: '#FFF', textDecoration: 'none' }}
              >
                {photographerName}
              </Link>
            )}
          </div>
          {/* Render the image */}
          <img 
            src={photo.url} 
            alt={photo.alt} 
            style={{ width: '190px', height: '120px' }} 
          />
        </div>
      ))}
    </div>
  );
}

// Export the PhotoGrid component to be used in other parts of the application
export default PhotoGrid;
