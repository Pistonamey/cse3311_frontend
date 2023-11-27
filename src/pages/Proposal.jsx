import React, { useState } from 'react';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
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
  const [quote, setQuote] = useState(null);

  const AcceptRequest = async () => {
    const token = Cookies.get('token');
    const name = useParams().name;
    console.log(name);
    fetch(`/proposal`, {
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
          console.log(resp);
          return resp.json(); // parse the response as JSON
        } else {
          alert("This didn't work");
        }
      })
      .then(data => setQuote(data)); // set the quote state with the parsed JSON data
  }

  return (
    <Container component="main" maxWidth="s">
      <div>
        <img src={logo.url} alt="" width="140px" height="140px" />
        <h1>Request Details</h1>
        {quote && (
          <>
            <p>Client Email: {quote.clientEmail}</p>
            <p>Quote Details:</p>
            <ul>
              <li>Start Day: {quote.quote.sDay}</li>
              <li>Start Time: {quote.quote.sTime}</li>
              <li>End Day: {quote.quote.eDay}</li>
              <li>End Time: {quote.quote.eTime}</li>
              <li>Type: {quote.quote.type}</li>
              <li>Location: {quote.quote.location}</li>
            </ul>
          </>
        )}

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
