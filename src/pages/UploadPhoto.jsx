import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import {
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  Grid,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode';

const UploadPhoto = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const token = Cookies.get('token')
  const decoded = jwtDecode(token)
  const username = decoded['username']

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

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

    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', JSON.stringify(tags));
    formData.append('username', username)

    try {
      const response = await fetch(`/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('File uploaded successfully.');
        setFile(null);
        setTitle('');
        setDescription('');
        setTags([]);
        setTagInput('');
      } else if (response.status === 400) {
        alert('Invalid file type');
      } else if (response.status === 403) {
        alert('Enter a title');
      } else if (response.status === 401) {
        alert('Unauthorized. Please log in.');
      } else if (response.status === 409) {
        alert('This title already exists')
      } else {
        alert('File upload failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
      <TopBar />
      <div
        style={{
          backgroundColor: '#2C2C2C',
          color: '#FFF',
          minHeight: 'calc(100vh - 60px)',
          width: '100%',
          overflowY: 'auto',
          boxSizing: 'border-box',
          position: 'relative',
          height: '100%',
        }}
      >
        <div style={{ marginTop: '60px', width: '100%' }}>
          <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h5" align="center" gutterBottom>
                Upload a Photo
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Select a Photo"
                      type="file"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      onChange={handleFileChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Title"
                      variant="outlined"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      variant="outlined"
                      multiline
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Grid>
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
                      Upload
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Container>
        </div>
      </div>
    </>
  );
};

export default UploadPhoto;
