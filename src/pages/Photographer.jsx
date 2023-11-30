import React, { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link, useParams } from 'react-router-dom';
import { CalendarMonthSharp } from '@mui/icons-material';

function Photographer() {
  const username = useParams().name;
  const token = Cookies.get('token');
  const decoded = jwtDecode(token);
  const isPhotographer = decoded['role'];

  const [profileImage, setProfileImage] = useState(null);
  const [photoList, setPhotoList] = useState([]);
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
              <div>
                <p>Description: {editedData?.description || 'N/A'}</p>
              </div>
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
                <Link to={`/photographer/${username}/Booking`} style={{ color: textColor, textDecoration: 'none' }}>
                  Booking: <CalendarMonthSharp style={{ color: textColor }} />
                </Link>
              </div>
            </div>
          </div>
          {(
            <div>
              <h2>Photos</h2>
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
        </div>
      </div>
    </>
  );
}

export default Photographer;
