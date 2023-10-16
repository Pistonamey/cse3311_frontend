import React from 'react';
import TopBar from '../components/TopBar'; 
import CommentSection from '../components/CommentSection';

function Commenting({photos}) {
  // Getting the name parameter from the URL
  //const { photoid } = useParams();

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

     <div class="center" style={{
      padding: '20px', 
      marginTop: '40px',    
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      }}>          
        <img src='/data/photos/photos8.png' alt='photo9' style={{ width: '50%', height: 'auto' }} />
        </div>

        <div>
        <CommentSection/>
        </div>

      </div>
    </>
  );
}

export default Commenting;
