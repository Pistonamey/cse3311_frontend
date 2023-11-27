// Importing necessary libraries and components
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { CalendarMonthSharp } from '@mui/icons-material';

// Define the Profile functional component that accepts photographerName as a prop
function Profile({ photographerName }) {
  const [profileImage, setProfileImage] = useState('');
  const [loading, setLoading] = useState(true);

  const username = useParams().name;

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch('/profile_image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProfileImage(data); // Assuming the endpoint returns a single image URL
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile image:', error);
        setLoading(false);
      }
    };

    fetchProfileImage();
  }, [photographerName]);

  return (
    // Container div for the profile
    <div style={{ display: 'flex', marginBottom: '20px', alignItems: 'center' }}>
      
      {/* Display the profile image */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <img 
          src={profileImage} 
          alt="Profile" 
          style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
        />
      )}
      
      {/* Container for photographer's name, title, and social media icons */}
      <div style={{ marginLeft: '20px' }}>
        
        {/* Display the photographer's name */}
        <h2>{photographerName}</h2>
        
        {/* Container for social media icons and booking link */}
        <div style={{ display: 'flex', gap: '10px' }}>
          
          {/* Booking Link with a calendar icon */}
          <Link to={`/photographer/${photographerName}/Booking`} style={{ color: '#FFF', textDecoration: 'none' }}>
            Booking: <CalendarMonthSharp style={{ color: 'white' }}/>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Export the Profile component to be used elsewhere in the application
export default Profile;
