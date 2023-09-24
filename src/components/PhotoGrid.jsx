import React from 'react';
import { Link } from 'react-router-dom';

function PhotoGrid({ photos, photographerName }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom:"18px" }}>
      {photos.map((photo, index) => (
        <div key={photo.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ height: '30px', marginBottom: index === 0 ? '0px' : '0' }}>
            {index === 0 && (
              <Link to={`/photographer/${photographerName}`} style={{ color: '#FFF', textDecoration: 'none' }}>
                {photographerName}
              </Link>
            )}
          </div>
          <img src={photo.url} alt={photo.alt} style={{ width: '100%', height: 'auto' }} />
        </div>
      ))}
    </div>
  );
}

export default PhotoGrid;

