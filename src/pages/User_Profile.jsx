import React, { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

function User_Profile() {
  const token = Cookies.get('token');
  const decoded = jwtDecode(token);
  const username = decoded['username'];
  const isPhotographer = decoded['role'];
  const S3_BUCKET = "pixera";

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
      console.log(data)
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
      <div style={{ padding: '20px', marginTop: '60px' }}>
        <h1>Welcome, {username}!</h1>

        {isPhotographer === 'Photographer' && (
          // Render photo section for photographers
          <div>
            <h2>Your Photos</h2>
            {photoList.length > 0 ? (
              photoList.map((photo, index) => (
                <img
                  key={index}
                  src={`${photo}`}
                  alt={`Photo ${index}`}
                  style={{ width: '100px', height: '100px', margin: '5px' }}
                />
              ))
            ) : (
              <p>No photos available</p>
            )}
          </div>
        )}

        {editingImage ? (
          // Render image editing form when editingImage is true
          <div>
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleSaveImage}>Save</button>
          </div>
        ) : (
          // Render the profile image and edit button when not editing
          <div>
            <button onClick={handleEditImage}>Edit Image</button>
          </div>
        )}
      </div>
    </>
  );
}

export default User_Profile;
