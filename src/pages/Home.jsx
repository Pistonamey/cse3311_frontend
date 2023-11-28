import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PhotoGrid from '../components/PhotoGrid';
import TopBar from '../components/TopBar';
import {
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  Grid,
  Box
} from '@mui/material';
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TagIcon from '@mui/icons-material/Tag';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';

import Dialog from '@mui/material/Dialog'; 
import DialogTitle from '@mui/material/DialogTitle'; 
import DialogContent from '@mui/material/DialogContent'; 
import DialogActions from '@mui/material/DialogActions';

// Define the Home component
function Home() {
  const [photoList, setPhotoList] = useState([]);
  const [allphotoList, setAllPhotoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prevUsername, setPrevUsername] = useState(null);

  const token = Cookies.get('token');
  const decoded = jwtDecode(token);
  const username = decoded['username'];

  useEffect(() => {
    fetchPhotoList();
    fetchPhotographers();
  }, [username]);

  const fetchPhotographers = async () => {
    try {
      const response = await fetch('/all_photographers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: 'Photographer' }),
      });
      const data = await response.json();
      setAllPhotoList(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching photographers:', error);
      setLoading(false);
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

  const navigate = useNavigate();

  const [tags, setTags] = useState([]);
  const [secondtags, setSecondTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [secondtagInput, setSecondTagInput] = useState('');

  const [open, setOpen] = React.useState(false); 
  const handleClickOpen = () => { setOpen(true);}; 
  const handleClose = () => { setOpen(false); };

  const [open1, setOpen1] = React.useState(false); 
  const handleClickOpen1 = () => { setOpen1(true);}; 
  const handleClose1 = () => { setOpen1(false); };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagInputChangePhotographer = (e) => {
    setSecondTagInput(e.target.value);
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const secondhandleTagInputKeyPress = (e) => {
    if (e.key === 'Enter' && secondtagInput.trim() !== '') {
      setSecondTags([...secondtags, secondtagInput.trim()]);
      setSecondTagInput('');
    }
  };

  const addTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const secondaddTag = () => {
    if (tagInput.trim() !== '') {
      setSecondTags([...secondtags, secondtagInput.trim()]);
      setSecondTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  };

  const secondremoveTag = (tagToRemove) => {
    const updatedTags = secondtags.filter((tag) => tag !== tagToRemove);
    setSecondTags(updatedTags);
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
        const data = await response.json(); // Parse the JSON response

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
        alert('This title already exists');
      } else {
        alert('File upload failed:', response);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleSubmitPhotographer = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('tags', JSON.stringify(secondtags));

    try {
      const response = await fetch(`/searchByPhotographerTag`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();  // Parse the JSON response

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
        <div style={{ padding: '20px', marginTop: '60px', width: '100%' }}>
          <form onSubmit={handleSubmit}>
            {/* Tags for filtering photos */} 
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<TagIcon />}
                  onClick = {handleClickOpen}
                >
                  Filter by Photos
                </Button>
                <Grid container spacing={2}>
              <Grid item xs={2}>  
                <Dialog onClose={handleClose} open={open}> 
                  <DialogContent dividers> 
                      <p>Please enter your tag</p>
                        <TextField
                          // fullWidth
                          style = {{width: 300}}
                          label="Tags"
                          variant="outlined"
                          value={tagInput}
                          sx={{ backgroundColor: "white" }}
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
                {tags.map((tag) => (
                  <Paper
                    variant="outlined"
                    square
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '4px 8px',
                      color: 'black'
                    }}
                  >
                    {tag}
                    <span
                      onClick={() => removeTag(tag)}
                      style={{ cursor: 'pointer' }}>
                      <CloseIcon />
                    </span>
                  </Paper>
                ))}
                   </DialogContent> 
                    <DialogActions> 
                      <Button variant="outlined" color="success" onClick={handleSubmit}> Submit </Button> 
                    </DialogActions>
                 </Dialog> 
               </Grid>
              </Grid>
          </form>


          {/* Form for filtering photos by photographer tags */}
          <form onSubmit={handleSubmitPhotographer}>                  
          <Button
              variant="contained"
              color="primary"
              startIcon={<CameraEnhanceIcon />}
              onClick = {handleClickOpen1}
              sx={{ marginTop: "15px" }}>
            Filter By Photographers
          </Button>
            <Grid container spacing={2} sx={{ marginTop: "15px" }}>
              <Grid item xs={2}>
              <Dialog onClose={handleClose1} open={open1}> 
                  <DialogContent dividers> 
                      <p>Please enter your photographer tag</p>
                  <TextField
                    style = {{width: 300}}
                    label="Tags"
                    variant="outlined"
                    value={secondtagInput}
                    sx={{ backgroundColor: "white", flex: 1, width: "30%" }}
                    onChange={handleTagInputChangePhotographer}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        secondhandleTagInputKeyPress(e);
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <span onClick={secondaddTag} style={{ cursor: 'pointer' }}>
                          #
                        </span>
                      ),
                    }}
                  />

              {/* Display selected photographer tags */}
              {secondtags.map((tag) => (
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
                      onClick={() => secondremoveTag(tag)}
                      style={{ cursor: 'pointer' }}
                    >
                      <CloseIcon />
                    </span>
                  </Paper>
              ))}
                    </DialogContent> 
                    <DialogActions> 
                      <Button variant="outlined" color="success" onClick={handleSubmitPhotographer}> Submit </Button> 
                    </DialogActions>
                 </Dialog>
                 </Grid>
              </Grid>
          </form>

          {/* Display photos based on the user role */}
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
                  <Link
                    key={photo.filename}
                    to={`/photographer/${username}/${photo.filename}`}
                  >
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
          <div>
            <h2>All Photographers</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              Object.entries(allphotoList).map(([photographerUsername, photographerData], index) => (
                <div key={index}>
                  {photographerData.photos && photographerData.photos.length > 0 && photographerUsername !== username && photographerData.photos !== null && (
                    <Link to={`/photographer/${photographerUsername}`}>
                      <h3>{photographerUsername}</h3>
                    </Link>
                  )}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                      gap: '16px',
                      marginBottom: '18px',
                    }}
                  >
                    {photographerData.photos && photographerData.photos.length > 0 && photographerUsername !== username && photographerData.photos !== null ? (
                      photographerData.photos.map((photo, photoIndex) => (
                        <Link
                          key={photo.filename}
                          to={`/photographer/${photographerUsername}/${photo.filename}`}
                        >
                          <img
                            src={photo.url}
                            alt={`Photo ${photo.filename}`}
                            style={{ width: '190px', height: '120px' }}
                          />
                        </Link>
                      ))
                    ) : (
                      <>
                        {/* This is an empty fragment */}
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
