import React, { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { CalendarMonthSharp } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function User_Profile() {
  // Get user information from the token
  const token = Cookies.get('token');
  const decoded = jwtDecode(token);
  const username = decoded['username'];
  const isPhotographer = decoded['role'];

  // State to manage the profile image
  const [profileImage, setProfileImage] = useState(null);
  const [editingImage, setEditingImage] = useState(false);
  const [photoList, setPhotoList] = useState([]);

  useEffect(() => {
    // Fetch photo list from the Flask endpoint
    fetchPhotoList();
  }, []); // Empty dependency array to run the effect only once

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
      console.log(data);
      setPhotoList(data); // Update the state with the correct property
    } catch (error) {
      console.error('Error fetching photo list:', error);
    }
  };

  // Function to handle file input change
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setProfileImage(selectedImage);
  };

  // Function to handle image editing
  const handleEditImage = () => {
    setEditingImage(true);
  };

  // Function to handle image save
  const handleSaveImage = () => {
    // Add logic to save the image, e.g., make an API call or update state
    setEditingImage(false);
  };

  return (
    <>
      <TopBar />
      <div
        style={{
          padding: '20px',
          marginTop: '60px',
          background: '#f0f0f0', // Set the background color to grey
        }}
      >
        {/* Profile Section */}
        <div style={{ display: 'flex', marginBottom: '20px', alignItems: 'center' }}>
          {/* Display the profile image */}
          <img
            src={editingImage}
            alt="Profile"
            style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
          />

          {/* Container for photographer's name, title, and social media icons */}
          <div style={{ marginLeft: '20px' }}>
            {/* Display the photographer's name */}
            <h2>{username}</h2>
            {/* Display the title or description (Modify this part according to your logic) */}
            <p>Title or Description</p>

            {/* Container for social media icons and booking link */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {/* LinkedIn Icon linking to LinkedIn */}
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <LinkedInIcon style={{ color: '#0e76a8' }} />
              </a>
              {/* Instagram Icon linking to Instagram */}
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <InstagramIcon style={{ color: '#C13584' }} />
              </a>
              {/* Twitter Icon linking to Twitter */}
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <TwitterIcon style={{ color: '#1DA1F2' }} />
              </a>
              {/* Booking Link with a calendar icon (Modify the Link according to your routing logic) */}
              <Link
                to={`/photographer/${username}/Booking`}
                style={{ color: '#FFF', textDecoration: 'none' }}
              >
                Booking: <CalendarMonthSharp style={{ color: 'white' }} />
              </Link>
            </div>
          </div>
        </div>

        {/* Photo Section */}
        {isPhotographer === 'Photographer' && (
          <div>
            <h2>Your Photos</h2>
            {photoList.length > 0 ? (
              photoList.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Photo ${index}`}
                  style={{ width: '200px', height: '200px', margin: '20px' }}
                />
              ))
            ) : (
              <p>No photos available</p>
            )}
          </div>
        )}

        {/* Image Editing Section */}
        {editingImage && (
          <div>
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleSaveImage}>Save</button>
          </div>
        )}
      </div>
    </>
  );
}

export default User_Profile;
