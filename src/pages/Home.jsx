import React from 'react';
import PhotoGrid from '../components/PhotoGrid';
import TopBar from '../components/TopBar'; // I

const photos = [
  { id: 1, url: '/data/photos/photo1.png', alt: 'Photo 1' },
  { id: 2, url: '/data/photos/photo2.png', alt: 'Photo 2' },
  { id: 3, url: '/data/photos/photo3.png', alt: 'Photo 3' },
  { id: 4, url: '/data/photos/photo4.png', alt: 'Photo 4' },
  { id: 5, url: '/data/photos/photo5.png', alt: 'Photo 5' },
  { id: 6, url: '/data/photos/photo3.png', alt: 'Photo 5' },
  { id: 6, url: '/data/photos/photo3.png', alt: 'Photo 5' },
];

function Home() {
  return (
    <>
      <TopBar />
      <div style={{
        backgroundColor: '#2C2C2C',
        color: '#FFF',
        minHeight: 'calc(100vh - 60px)', // Adjusting the viewport height
        width: '100%', // Updated from 100vw to 100%
        overflowY: 'auto',
        boxSizing: 'border-box',
        position: 'relative',
      }}>
        <div style={{ padding: '20px', marginTop: '60px',width:'100%' }}> {/* Inner div with padding and margin */}
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

export default Home;
