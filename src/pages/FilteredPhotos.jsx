import React from 'react';
import { useLocation } from 'react-router-dom';
import TopBar from '../components/TopBar';
const FilteredPhotos = () => {
    const location = useLocation();
    const data = location.state?.data;

    return (
        <>
        <TopBar />
      <div style={{
        backgroundColor: '#2C2C2C',
        color: '#FFF',
        minHeight: 'calc(100vh - 40px)', // Adjusting the viewport height
        width: '100%', // Updated from 100vw to 100%
        overflowY: 'auto',
        boxSizing: 'border-box',
        position: 'relative',
      }}>
            
            <div style={{ display: 'flex', flexWrap: 'wrap',padding: '20px', marginTop: '60px',width:'100%'  }}>
            
                {data && data.map((photo, index) => (
                    <div key={index} style={{ margin: '10px' }}>
                        <img src={photo.url} alt={photo.filename} style={{ width: '300px', height: '200px' }} />
                       
                    </div>
                ))}
            </div>
            </div>
            </>
    );
}

export default FilteredPhotos;
