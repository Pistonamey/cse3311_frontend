import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import GoogleIcon from '@mui/icons-material/Google';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie'

const defaultTheme = createTheme();

export default function Login() {
  const logo = { id: 6, url: '/data/photos/pixera_logo.png', alt: 'Photo 5' };
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const formData = {
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if the response status is 200
      if (response.status === 200) {
        // Get the 'Authorization' header from the response
        const jwtToken = response.headers.get('Authorization');
        const token = jwtToken.split(' ')[1]
        // const customHeaders = new Headers();
        // customHeaders.append('Authorization', `Bearer ${token}`);

        if (jwtToken) {
          // Set the JWT token as a cookie
          Cookies.set('token', token, { expires: 1 / 24 }); // Expires in 1 hour
          window.location.href = `/verify2FA`;
        }
      } else if (response.status === 404) {
        alert('Go through forgot password to add a password');
        window.location.href = '/forgot_password';
      } else {
        alert('Please check email or password');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `/login_user`;
  };

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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'black' }}
            >
              Sign In
            </Button>
            <Typography sx={{ textAlign: 'center' }}>OR</Typography>
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
              <Grid item xs>
                <Link href="/forgot_password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
