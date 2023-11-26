// Import necessary React library
import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
// Import custom components for use in this component
import PhotoGrid from '../components/PhotoGrid';
import TopBar from '../components/TopBar';
import MenuSidebar from '../components/MenuSidebar';

// Define the Home component
function Home() {
  const [photoList, setPhotoList] = useState([]);

  fetchPhotoList();
  const location = useLocation();

  const fetchPhotoList = async () => {
    try {
      const response = await fetch(`/photo_upload/list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      setPhotoList(data);
    } catch (error) {
      console.error('Error fetching photo list:', error);
    }
  };
  
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
        {/* <MenuSidebar style={{ padding: '20px', marginTop: '60px'}}/> */}
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
