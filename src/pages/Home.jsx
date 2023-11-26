// Import necessary React library
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Import custom components for use in this component
import PhotoGrid from '../components/PhotoGrid';
import TopBar from '../components/TopBar';
import {
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  Grid,
} from '@mui/material';
import Cookies from 'js-cookie'
import CloseIcon from '@mui/icons-material/Close';
import MenuSidebar from '../components/MenuSidebar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Sample photo data, representing a list of photo details
const photos = [
  { id: 1, url: '/data/photos/photo1.jpg', alt: 'Photo 1' },
  { id: 2, url: '/data/photos/photo2.jpg', alt: 'Photo 2' },
  { id: 3, url: '/data/photos/photo3.jpg', alt: 'Photo 3' },
  { id: 4, url: '/data/photos/photo4.jpg', alt: 'Photo 4' },
  { id: 5, url: '/data/photos/photo5.jpg', alt: 'Photo 5' },
];



// Define the Home component
function Home() {
  const token = Cookies.get('token')
  const location = useLocation();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const navigate=useNavigate()
  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };
  
  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  const addTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  const removeTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    
    formData.append('tags', JSON.stringify(tags));
  

    try {
      const response = await fetch(`/search`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();  // Parse the JSON response
        console.log(data);
        
        setTags([]);
        setTagInput('');
        navigate('/filtered', { state: { data } });
      } else if (response.status === 400) {
        alert('Invalid file type');
      } else if (response.status === 403) {
        alert('Enter a title');
      } else if (response.status === 401) {
        alert('Unauthorized. Please log in.');
      } else if (response.status === 409) {
        alert('This title already exists')
      } else {
        alert('File upload failed:', response);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
      <TopBar />
      <div style={{
        backgroundColor: '#2C2C2C',
        color: '#FFF',
        minHeight: 'calc(100vh - 60px)', // Adjusting the viewport height
        width: '100%', // Updated from 100vw to 100%
        overflowY: 'auto',
        boxSizing: 'border-box',
        position: 'relative',
      }}>
        {/* <MenuSidebar style={{ padding: '20px', marginTop: '60px'}}/> */}
        <div style={{ padding: '20px', marginTop: '60px',width:'100%' }}> {/* Inner div with padding and margin */}
        <form onSubmit={handleSubmit}>
        <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Tags"
                      variant="outlined"
                      value={tagInput}
                      onChange={handleTagInputChange}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleTagInputKeyPress(e);
                        }
                      }}
                      InputProps={{
                        startAdornment: (
                          <span onClick={addTag} style={{ cursor: 'pointer' }}>
                            #
                          </span>
                        ),
                      }}
                    />
                  </Grid>
                  {tags.map((tag) => (
                    <Grid item key={tag} xs={3}>
                      <Paper
                        variant="outlined"
                        square
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '4px 8px',
                        }}
                      >
                        {tag}
                        <span
                          onClick={() => removeTag(tag)}
                          style={{ cursor: 'pointer' }}
                        >
                          <CloseIcon />
                        </span>
                      </Paper>
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      startIcon={<CloudUploadIcon />}
                      type="submit"
                    >
                      Filter
                    </Button>
                  </Grid>
                  </form>
          <PhotoGrid photos={photos} photographerName="Amey" />
          <PhotoGrid photos={photos} photographerName="Piston" />
          <PhotoGrid photos={photos} photographerName="Legend" />
          <PhotoGrid photos={photos} photographerName="Micke" />
          <PhotoGrid photos={photos} photographerName="Tun ton" />
        </div>
      </div>
    </>
  );
}

export default Home;
