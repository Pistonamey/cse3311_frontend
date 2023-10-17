import React from 'react';
import TopBar from '../components/TopBar'; 
import { useParams } from 'react-router-dom';
import PhotoGrid from '../components/PhotoGrid';
import Profile from '../components/Profile'; // Imp
function Photographer() {
  // Getting the name parameter from the URL
  const { name } = useParams();

  const photos = [
    { id: 1, url: '/data/photos/photo8.jpg', alt: 'Photo 1' },
    { id: 2, url: '/data/photos/photo7.jpg', alt: 'Photo 2' },
    { id: 3, url: '/data/photos/photo6.jpg', alt: 'Photo 3' },
    { id: 4, url: '/data/photos/photo9.jpg', alt: 'Photo 4' },
    { id: 5, url: '/data/photos/photo1.jpg', alt: 'Photo 5' },
    { id: 6, url: '/data/photos/photo4.jpg', alt: 'Photo 5' },
    { id: 8, url: '/data/photos/photo3.jpg', alt: 'Photo 5' },
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
    <Profile photoGrapherName={name}/>
     {/* Inner div with padding and margin */}
          <PhotoGrid photos={photos} />
          <PhotoGrid photos={photos} />
          <PhotoGrid photos={photos} />
          <PhotoGrid photos={photos} />
          <PhotoGrid photos={photos} />
        
      </div>
    </div>
    </>
  );
}

export default Photographer;
