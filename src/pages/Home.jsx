// Import necessary React library
import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
// Import custom components for use in this component
import PhotoGrid from '../components/PhotoGrid';
import TopBar from '../components/TopBar';
import MenuSidebar from '../components/MenuSidebar';

// Sample photo data, representing a list of photo details
const photos = [
  { id: 1, url: '/data/photos/photo1.jpg', alt: 'Photo 1' },
  { id: 2, url: '/data/photos/photo2.jpg', alt: 'Photo 2' },
  { id: 3, url: '/data/photos/photo3.jpg', alt: 'Photo 3' },
  { id: 4, url: '/data/photos/photo4.jpg', alt: 'Photo 4' },
  { id: 5, url: '/data/photos/photo5.jpg', alt: 'Photo 5' },
];

// Define the Home component
function Home() {
  const location = useLocation();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const token = params.get('token');
  //   console.log(token)
  //   if(token){
  //     console.log("inhere")
  //     setIsAuthenticated(true)
  //   }
  //   else{
  //     console.log("came to false")
  //     setIsAuthenticated(false)
  //   }// Set isAuthenticated to true if token exists
    
  // }, [location]);
  
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
