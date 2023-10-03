// Importing necessary libraries and components
import React from 'react';
import { Link } from 'react-router-dom';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { CalendarMonthSharp } from '@mui/icons-material';

// Define the Profile functional component that accepts photoGrapherName as a prop
function Profile({photoGrapherName}) {
  return (
    // Container div for the profile
    <div style={{ display: 'flex', marginBottom: '20px', alignItems: 'center' }}>
      
      {/* Display the profile image */}
      <img 
        src="/data/photos/user.png" 
        alt="Profile" 
        style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
      />
      
      {/* Container for photographer's name, title, and social media icons */}
      <div style={{ marginLeft: '20px' }}>
        
        {/* Display the photographer's name */}
        <h2>{photoGrapherName}</h2>
        
        {/* Display the title or description */}
        <p>Title or Description</p>
        
        {/* Container for social media icons and booking link */}
        <div style={{ display: 'flex', gap: '10px' }}>
          
          {/* LinkedIn Icon linking to LinkedIn */}
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon style={{ color: '#0e76a8' }}/>
          </a>
          
          {/* Instagram Icon linking to Instagram */}
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <InstagramIcon style={{ color: '#C13584' }}/>
          </a>
          
          {/* Twitter Icon linking to Twitter */}
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <TwitterIcon style={{ color: '#1DA1F2' }}/>
          </a>
          
          {/* Booking Link with a calendar icon */}
          <Link to={`/photographer/${photoGrapherName}/Booking`} style={{ color: '#FFF', textDecoration: 'none' }}>
            Booking: <CalendarMonthSharp style={{ color: 'white' }}/>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Export the Profile component to be used elsewhere in the application
export default Profile;
