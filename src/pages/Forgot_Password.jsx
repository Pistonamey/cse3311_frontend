import React, { useState } from 'react';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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

function ForgotPasswordForm() {
    const logo = { id: 6, url: '/data/photos/pixera_logo.png', alt: 'Photo 5' }
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        fetch('/forgot_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `email=${email}`,
        })
        .then(resp => {
            if (resp.status === 404) {
                alert("Email does not exist");
            }
            else if (resp.status === 200) {
                alert("check your email")
            } else {
                alert("This didn't work")
            }
        })
};

    return (
        <Container component="main" maxWidth="xs">
            <div>
                <img src={logo.url} alt="" width="140px" height="140px" />
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        label="Email"
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" fullWidth>
                        Submit
                    </Button>
                </form>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/" variant="body2">
                            Remember your password? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </div>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
}

export default ForgotPasswordForm;
