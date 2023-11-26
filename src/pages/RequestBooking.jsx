import React, { useState } from 'react';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import BookingDialog from '../pages/Booking';

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

function RequestBooking() {
    const logo = { id: 6, url: '/data/photos/pixera_logo.png', alt: 'Photo 5' }
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        fetch('/request_booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `email=${email}`,
        })
        .then(resp => {
            if (resp.status === 404) {
                alert("ERROR: sending request");
            }
            else if (resp.status === 200) {
                alert("Thank you for booking with PixEra! Your request was submitted!")
            } else {
                alert("This didn't work")
            }
        })
};

    return (
        <Container component="main" maxWidth="s">
            <div>
                <img src={logo.url} alt="" width="140px" height="140px" />
                <h1>Thank you for booking with PixEra! Your request was submitted!</h1>
                {/* display request details here */}
                <Grid container justifyContent="flex-middle">
                    <Grid item>
                        <Link href="/home" variant="body2">
                        <Button type="submit" variant="contained" fullWidth>
                        Return to Home
                        </Button>
                        </Link>
                    </Grid>
                </Grid>
            </div>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
}

export default RequestBooking;
