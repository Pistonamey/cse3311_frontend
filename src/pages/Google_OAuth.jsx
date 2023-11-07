import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import GoogleIcon from '@mui/icons-material/Google';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Google_OAuth() {
  const [selectedRole, setSelectedRole] = React.useState('');
  const [formData, setFormData] = React.useState({
    username: '',
    country: '',
    city: '',
    role: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Your form submission logic here
  };

  const isSignUpButtonDisabled = !selectedRole; // Determine if the "Sign Up" button should be disabled

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Google OAuth
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  id="username"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="country"
                  label="Country"
                  id="country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  label="City"
                  id="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <RadioGroup
                  aria-label="role"
                  name="role"
                  value={selectedRole}
                  onChange={(event) => setSelectedRole(event.target.value)}
                >
                  <FormControlLabel
                    value="Customer"
                    control={<Radio />}
                    label="Customer"
                  />
                  <FormControlLabel
                    value="Photographer"
                    control={<Radio />}
                    label="Photographer"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "black" }}
              disabled={isSignUpButtonDisabled}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Typography sx={{ textAlign: "center" }}>OR</Typography>
            {/* Google sign-in button */}
            <Button
              component="label"
              variant="contained"
              startIcon={<GoogleIcon />}
              sx={{ mt: 2, mb: 2 }}
              fullWidth
              onClick={handleGoogleLogin} // Define your Google OAuth login function
            >
              Sign In with Google
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Google_OAuth;
