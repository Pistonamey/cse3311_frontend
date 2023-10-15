import React from 'react';
import TopBar from '../components/TopBar'; 
import { useParams } from 'react-router-dom';
import PhotoGrid from '../components/PhotoGrid';
import Profile from '../components/Profile'; // Imp
function Commenting() {
  // Getting the name parameter from the URL
  const { photoid } = useParams();

  const photos = [
    { id: 1, url: '/data/photos/photos8.png', alt: 'Photo 1' },
  ];

  return (

    <>
     <TopBar />
     <div style={{
        backgroundColor: '#2C2C2C',
        color: '#FFF',
        minHeight: '100vh', // Adjusting the viewport height
        width: '100%', 
        height:'100%',// Updated from 100vw to 100%
        overflowY: 'auto',
        boxSizing: 'border-box',
        position: 'relative',
      }}>
          <div style={{ padding: '20px', marginTop: '60px',width:'100%' }}>
    <Profile photoGrapherName={photoid}/>
     {/* Inner div with padding and margin */}
     <div style={{ padding: '20px', marginTop: '60px',width:'20%' }}>
          <PhotoGrid photos={photos}  />
          </div>
      </div>
    </div>
    </>
  );
}

export default Commenting;
