import React, { useState } from 'react';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import BookingDialog from '../pages/Booking'

import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom';

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


function Proposal() {
    const logo = { id: 6, url: '/data/photos/pixera_logo.png', alt: 'Photo 5' }
    const [email, setEmail] = useState('');

    const name = useParams().name;

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
 
    const AcceptRequest = async () => { 
        const token = Cookies.get('token')
        const name = useParams().name;
        console.log(name)
        fetch(`/${name}/proposal`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({ name })
            })
          .then(resp => {
              if (resp.status === 404) {
                  alert("ERROR: sending request");
              }
              else if (resp.status === 200) {
                  alert("Thank you for booking with PixEra! Your request was submitted!")
              } else {
                  alert("This didn't work")
              }})}
     

return (
    <Container component="main" maxWidth="s">
        <div>
            <img src={logo.url} alt="" width="140px" height="140px" />
            <h1>Request Details</h1>
            <h2></h2>

            {/* display request details here */}
            <Grid container justifyContent="flex-middle">
                <Grid item>
                    <Link href="/home" variant="body2">
                    <Button type="submit" variant="contained" fullWidth onClick={AcceptRequest}>
                    Accept
                    </Button>
                    </Link> 

                    <Link href="/home" variant="body2">
                    <Button type="submit" variant="contained" fullWidth>
                    Decline
                    </Button>
                    </Link> 
                </Grid>
            </Grid>
        </div>
        <Copyright sx={{ mt: 5 }} />
    </Container>
);
}

export default Proposal;
