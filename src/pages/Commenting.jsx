// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import { useParams } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

// Placeholder function, replace it with your actual implementation
const getCurrentUser = () => {
  const token = Cookies.get('token')
  const decoded = jwtDecode(token)
  const username = decoded['username']
  return { username: username };
};

const Commenting = () => {
  const { photoid } = useParams();
  const { name } = useParams();

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [Image, setImage] = useState(null);

  useEffect(() => {
    fetchImage();
    fetchLikeDislikeCount();
  }, []);

  const fetchLikeDislikeCount = async () => {
    try {
      const response = await fetch(`/like_dislike_count/${photoid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        const { likes, dislikes } = await response.json();
        setLikes(likes);
        setDislikes(dislikes);
      } else {
        console.error('Error fetching like and dislike counts:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching like and dislike counts:', error);
    }
  };

  const handleLike = async () => {
    if (!hasLiked) {
      setHasLiked((prevHasLiked) => !prevHasLiked);
      localStorage.setItem(`liked-${photoid}`, 'true');
      localStorage.setItem(`disliked-${photoid}`, 'false');

      try {
        if (hasDisliked && dislikes > 0) {
          setDislikes((prevDislikes) => prevDislikes - 1);
          setHasDisliked(false);
        }

        const response = await fetch(`/like/${photoid}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        });

        if (response.ok) {
          const { likes: updatedLikes } = await response.json();
          setLikes(updatedLikes);
        } else {
          console.error('Error liking photo:', response.statusText);
        }
      } catch (error) {
        console.error('Error liking photo:', error);
      }
    }
  };

  const handleDislike = async () => {
    if (!hasDisliked) {
      setHasDisliked((prevHasDisliked) => !prevHasDisliked);
      localStorage.setItem(`disliked-${photoid}`, 'true');
      localStorage.setItem(`liked-${photoid}`, 'false');

      try {
        if (hasLiked && likes > 0) {
          setLikes((prevLikes) => prevLikes - 1);
          setHasLiked(false);
        }

        const response = await fetch(`/dislike/${photoid}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        });

        if (response.ok) {
          const { dislikes: updatedDislikes } = await response.json();
          setDislikes(updatedDislikes);
        } else {
          console.error('Error disliking photo:', response.statusText);
        }
      } catch (error) {
        console.error('Error disliking photo:', error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/delete/${photoid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        localStorage.removeItem(`disliked-${photoid}`, 'true');
        localStorage.removeItem(`liked-${photoid}`, 'false');
        window.location.href = '/user_profile';
      } else {
        console.error('Error deleting image:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const fetchImage = async () => {
    try {
      const formData = new FormData();
      formData.append('key', photoid);
      formData.append('username', name);

      const response = await fetch(`/fetch_image`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const imageUrl = await response.json();
        setImage(imageUrl);
      } else {
        console.error('Error fetching profile image:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };

  useEffect(() => {
    const liked = localStorage.getItem(`liked-${photoid}`);
    const disliked = localStorage.getItem(`disliked-${photoid}`);

    const likedBool = liked === 'true';
    const dislikedBool = disliked === 'true';

    setHasLiked(likedBool);
    setHasDisliked(dislikedBool);
  }, [photoid]);

  const { username } = getCurrentUser();
  const isCurrentUserUploader = name === username;

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
        <div
          className="center"
          style={{
            padding: '20px',
            marginTop: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={Image}
            alt='photo'
            style={{ width: '50%', maxHeight: '400px', objectFit: 'contain' }}
          />
          <div style={{ marginTop: '20px' }}>
            <ThumbUpIcon
              onClick={handleLike}
              style={{
                fontSize: '40px',
                color: hasLiked ? '#4caf50' : '#2196F3',
                cursor: hasLiked ? 'not-allowed' : 'pointer',
              }}
            />
            <span style={{ margin: '0 10px' }}>{likes} Likes</span>
            <ThumbDownIcon
              onClick={handleDislike}
              style={{
                fontSize: '40px',
                color: hasDisliked ? '#f44336' : '#2196F3',
                cursor: hasDisliked ? 'not-allowed' : 'pointer',
              }}
            />
            <span style={{ margin: '0 10px' }}>{dislikes} Dislikes</span>
          </div>
          <div style={{ marginTop: '20px' }}>
            {isCurrentUserUploader && (
              <button onClick={handleDelete} style={{ fontSize: '20px', color: '#f44336', cursor: 'pointer' }}>
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Commenting;
