import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import { useParams } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

function Commenting() {
  // Getting the name parameter from the URL
  const { photoid } = useParams();
  const photo_source = '/data/photos/' + photoid;

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
      // Optionally, you can also disable the dislike button if the user has already liked.
      if (hasDisliked) {
        setDislikes(dislikes - 1);
        setHasDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (!hasDisliked) {
      setDislikes(dislikes + 1);
      setHasDisliked(true);
      // Optionally, you can also disable the like button if the user has already disliked.
      if (hasLiked) {
        setLikes(likes - 1);
        setHasLiked(false);
      }
    }
  };

  return (
    <>
      <TopBar />
      <div
        style={{
          backgroundColor: '#2C2C2C',
          color: '#FFF',
          minHeight: '100vh', // Adjusting the viewport height
          width: '100%',
          height: '100%', // Updated from 100vw to 100%
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
            src={photo_source}
            alt='photo'
            style={{ width: '50%', height: 'auto' }}
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
        </div>
      </div>
    </>
  );
}

export default Commenting;
