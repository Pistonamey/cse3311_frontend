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

const UploadPhoto = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

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
    formData.append('photo', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', JSON.stringify(tags));

    try {
      const response = await fetch(process.env.REACT_APP_BACK_END_URL, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File uploaded successfully.');
        // Clear the form fields and the selected file
        setFile(null);
        setTitle('');
        setDescription('');
        setTags([]);
        setTagInput('');
      } else {
        alert('Failed to upload file.');
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
                          width:"25px"
                        }}
                      >
                        {tag}
                        <span
                          onClick={() => removeTag(tag)}
                          style={{ cursor: 'pointer' }}
                        >
                          <CloseIcon/>
                        </span>
                      </Paper>
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      startIcon={<CloudUploadIcon />}
                      type="primary"
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
