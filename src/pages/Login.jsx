// Import necessary dependencies from the MUI library
import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import GoogleIcon from '@mui/icons-material/Google';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate, useLocation } from 'react-router-dom'; // Updated import
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Define a Copyright component that displays a copyright statement
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/home">
        PixEra
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// Create a default theme using MUI's createTheme function
const defaultTheme = createTheme();

// Define the main Login component
export default function Login() {
  // Sample logo data (you might get this from a prop or API call in a real-world scenario)
  const logo = { id: 6, url: '/data/photos/pixera_logo.png', alt: 'Photo 5' };
  const navigate = useNavigate(); // Updated usage
  const location = useLocation();
  
  // Function to store the token in local storage
  const storeTokenInLocalStorage = (token) => {
    localStorage.setItem('jwtToken', token);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    console.log("triggered"+token)
    if (token) {
      // Store the token in local storage
      storeTokenInLocalStorage(token);

      // Redirect to /home using navigate
      navigate(`/home`); // Updated navigation
    }
  }, [location, navigate]);

  const handleGoogleLogin = () => {
    // Redirect the user to the backend for Google authentication
    window.location.href = `${process.env.REACT_APP_BACK_END_URL}/login_user`;
  };

  // Render the login component
  return (
    <ThemeProvider theme={defaultTheme}>
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
          <img width="140px" src={logo.url} alt="" height="140px" />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {/* Email input field */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            {/* Password input field */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* Remember me checkbox */}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {/* Submit button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'black' }}
            >
              Sign In
            </Button>
            <Typography sx={{ textAlign: 'center' }}>OR</Typography>
            {/* Google sign in button */}
            <Button
              component="label"
              variant="contained"
              startIcon={<GoogleIcon />}
              sx={{ mt: 2, mb: 2 }}
              fullWidth
              onClick={handleGoogleLogin}
            >
              Sign In with Google
            </Button>
            <Grid container>
              {/* Forgot password link */}
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              {/* Sign Up link */}
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* Display the Copyright component */}
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
