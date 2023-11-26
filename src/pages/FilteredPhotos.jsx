import React from 'react';
import { useLocation } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { Link } from 'react-router-dom';

const FilteredPhotos = () => {
    const location = useLocation();
    const data = location.state?.data;

    return (
        <>
            <TopBar />
            <div style={{
                backgroundColor: '#2C2C2C',
                color: '#FFF',
                minHeight: 'calc(100vh - 40px)',
                width: '100%',
                overflowY: 'auto',
                boxSizing: 'border-box',
                position: 'relative',
            }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', padding: '20px', marginTop: '60px', width: '100%' }}>
                    {data && data.map((photo, index) => (
                        <div key={index} style={{ margin: '10px' }}>
                            <Link to={`/photographer/${photo.username}`}>
                                <img src={photo.url} alt={photo.filename} style={{ width: '300px', height: '200px' }} />
                            </Link>
                            <div style={{ marginTop: '10px' }}>
                                <Link to={`/photographer/${photo.username}/${photo.filename}`} style={{ color: 'white', textDecoration: 'underline' }}>
                                    Photo: {photo.username}/{photo.filename}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default FilteredPhotos;
