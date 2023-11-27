import React, { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from 'react-router-dom';
import { CalendarMonthSharp } from '@mui/icons-material';

function User_Profile() {
  const token = Cookies.get('token');
  const decoded = jwtDecode(token);
  const username = decoded['username'];
  const isPhotographer = decoded['role'];

  const [profileImage, setProfileImage] = useState(null);
  const [editingImage, setEditingImage] = useState(false);
  const [photoList, setPhotoList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({
    description: 'Tell us about yourself!',
    twitterLink: 'https://twitter.com/',
    instaLink: 'https://www.instagram.com/',
    linkedInLink: 'https://www.linkedin.com/',
    username: username,
  });

  useEffect(() => {
    fetchUserData();
    fetchPhotoList();
    fetchProfileImage();
  }, [username]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`/fetchUserData/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const userData = await response.json();
        setEditedData({
          description: userData.description,
          twitterLink: userData.twitterLink,
          instaLink: userData.instaLink,
          linkedInLink: userData.linkedInLink,
          username: userData.username,
        });
      } else {
        console.error('Error fetching user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

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
      setPhotoList(data);
    } catch (error) {
      console.error('Error fetching photo list:', error);
    }
  };

  const fetchProfileImage = async () => {
    try {
      const response = await fetch(`/profile_image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      if (response.ok) {
        const imageUrl = await response.json();
        setProfileImage(imageUrl);
      } else {
        console.error('Error fetching profile image:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };

  const isLightColor = (hexColor) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
  };

  const backgroundColor = '#2C2C2C';
  const textColor = isLightColor(backgroundColor) ? '#000' : '#FFF';

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setProfileImage(selectedImage);
  };

  const handleEditImage = () => {
    setEditingImage(true);
  };

  const handleSaveImage = async () => {
    try {
      const formData = new FormData();
      formData.append('file', profileImage);
      formData.append('username', username);

      const response = await fetch('/uploadProfileImage', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const imageUrl = await response.json();
        setProfileImage(imageUrl);
      } else {
        console.error('Profile image upload failed');
      }

      setEditingImage(false);
    } catch (error) {
      console.error('Error uploading profile image:', error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSaveEdit = async () => {
    setEditMode(false);
    try {
      const response = await fetch('/saveEditedData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ username, editedData }),
      });

      if (response.ok) {
        const Token = response.headers.get('Authorization');
        const newToken = Token.split(' ')[1]
        Cookies.remove('token')
        Cookies.set('token', newToken, { expires: 1 / 24 }); // Expires in 1 hour
      } else {
        console.error('Failed to save edited data');
      }
    } catch (error) {
      console.error('Error saving edited data:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Make API calls to delete the user's data on the server (MongoDB, DigitalOcean, etc.)
      const response = await fetch('/deleteAccount', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        localStorage.clear();
        window.location.href = '/';
      } else {
        console.error('Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <TopBar />
      <div
        style={{
          backgroundColor: '#2C2C2C',
          color: '#FFF',
          minHeight: '100vh',
          width: '100%',
          height: '100%',
          overflowY: 'auto',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        <div style={{ padding: '20px', marginTop: '60px', width: '100%' }}>
          <div style={{ display: 'flex', marginBottom: '20px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={profileImage}
                alt="Profile"
                style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ marginLeft: '20px' }}>
              <h2 style={{ color: textColor }}>{editedData.username}</h2>
              {editMode ? (
                <>
                  <textarea
                    name="description"
                    value={editedData.description}
                    onChange={handleChange}
                    placeholder="Enter description"
                  />
                  {/* Remove the textarea for username in edit mode */}
                  <textarea
                    name="twitterLink"
                    value={editedData.twitterLink}
                    onChange={handleChange}
                    placeholder="Enter Twitter URL"
                  />
                  <textarea
                    name="instaLink"
                    value={editedData.instaLink}
                    onChange={handleChange}
                    placeholder="Enter Instagram URL"
                  />
                  <textarea
                    name="linkedInLink"
                    value={editedData.linkedInLink}
                    onChange={handleChange}
                    placeholder="Enter LinkedIn URL"
                  />
                </>
              ) : (
                <div>
                  <p>Description: {editedData?.description || 'N/A'}</p>
                </div>
              )}
              <div style={{ display: 'flex', gap: '10px' }}>
                {editedData?.linkedInLink && (
                  <a href={editedData.linkedInLink} target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon style={{ color: '#0e76a8' }} />
                  </a>
                )}
                {editedData?.instaLink && (
                  <a href={editedData.instaLink} target="_blank" rel="noopener noreferrer">
                    <InstagramIcon style={{ color: '#C13584' }} />
                  </a>
                )}
                {editedData?.twitterLink && (
                  <a href={editedData.twitterLink} target="_blank" rel="noopener noreferrer">
                    <TwitterIcon style={{ color: '#1DA1F2' }} />
                  </a>
                )}
                {decoded['role'] !== 'Customer' && <Link to={`/photographer/${username}/Booking`} style={{ color: textColor, textDecoration: 'none' }}>
                  'Booking:' <CalendarMonthSharp style={{ color: textColor }} />
                </Link>}
              </div>
              {editMode ? (
                <button onClick={handleSaveEdit}>Save</button>
              ) : (
                <button onClick={handleEdit}>Edit Info</button>
              )}
              {editingImage && (
                <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                  <input type="file" onChange={handleImageChange} />
                  <button onClick={handleSaveImage}>Save</button>
                </div>
              )}
              {!editingImage && (
                <button onClick={handleEditImage} style={{ marginLeft: '20px' }}>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
          {isPhotographer === 'Photographer' && (
            <div>
              <h2>Your Photos</h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '16px',
                  marginBottom: '18px',
                }}
              >
                {photoList.length > 0 ? (
                  photoList.map((photo) => (
                    <Link key={photo.filename} to={`/photographer/${username}/${photo.filename}`}>
                      <img
                        src={photo.url}
                        alt={`Photo ${photo.filename}`}
                        style={{ width: '190px', height: '120px' }}
                      />
                    </Link>
                  ))
                ) : (
                  <p>No photos available</p>
                )}
              </div>
            </div>
          )}
          <button onClick={handleDeleteAccount}>Delete Account</button>
        </div>
      </div>
    </>
  );
}

export default User_Profile;
