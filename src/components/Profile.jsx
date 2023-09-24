import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

function Profile({photoGrapherName}) {
  return (
    <div style={{ display: 'flex', marginBottom: '20px', alignItems: 'center' }}>
      <img 
        src="/data/photos/user.png" 
        alt="Profile" 
        style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
      />
      <div style={{ marginLeft: '20px' }}>
        <h2>{photoGrapherName}</h2>
        <p>Title or Description</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon style={{ color: '#0e76a8' }}/>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <InstagramIcon style={{ color: '#C13584' }}/>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <TwitterIcon style={{ color: '#1DA1F2' }}/>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Profile;
