import React from 'react';
import TopBar from '../components/TopBar'; 
import { useParams } from 'react-router-dom';
import Calendar from '../components/Calendar';
import Profile from '../components/Profile'; // Imp
function Booking() {
  // Getting the name parameter from the URL
  const { name } = useParams();

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
          <Calendar/>
        
      </div>
    </div>
    </>
  );
}

export default Booking;
