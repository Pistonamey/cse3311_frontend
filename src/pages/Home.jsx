// Import necessary React library
import React from 'react';

// Import custom components for use in this component
import PhotoGrid from '../components/PhotoGrid';
import TopBar from '../components/TopBar';

// Sample photo data, representing a list of photo details
const photos = [
  { id: 1, url: '/data/photos/photo1.jpg', alt: 'Photo 1' },
  { id: 2, url: '/data/photos/photo2.jpg', alt: 'Photo 2' },
  { id: 3, url: '/data/photos/photo3.jpg', alt: 'Photo 3' },
  { id: 4, url: '/data/photos/photo4.jpg', alt: 'Photo 4' },
  { id: 5, url: '/data/photos/photo5.jpg', alt: 'Photo 5' },
  { id: 6, url: '/data/photos/photo3.jpg', alt: 'Photo 5' },
  { id: 6, url: '/data/photos/photo3.jpg', alt: 'Photo 5' },
];

// Define the Home component
function Home() {
  return (
    // Using React Fragment to group multiple children without adding extra nodes to the DOM
    <>
      {/* Render the TopBar component */}
      <TopBar />

      {/* A div container with dark background */}
      <div style={{
        backgroundColor: '#2C2C2C',
        color: '#FFF',
        minHeight: 'calc(100vh - 60px)',
        width: '100%', // Use 100% to make the width responsive to the parent container
        overflowY: 'auto',
        boxSizing: 'border-box',
        position: 'relative',
      }}>
        {/* Inner div to provide padding and margin */}
        <div style={{ padding: '20px', marginTop: '60px', width: '100%' }}>
          {/* Render multiple instances of PhotoGrid component with different photographer names */}
          <PhotoGrid photos={photos} photographerName="Amey" />
          <PhotoGrid photos={photos} photographerName="Piston" />
          <PhotoGrid photos={photos} photographerName="Legend" />
          <PhotoGrid photos={photos} photographerName="Micke" />
          <PhotoGrid photos={photos} photographerName="Tun ton" />
        </div>
      </div>
    </>
  );
}

// Export the Home component to be used in other parts of the application
export default Home;
