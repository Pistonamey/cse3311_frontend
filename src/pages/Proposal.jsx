import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';

function Proposal({ onAccept }) {
  const logo = { id: 6, url: '/data/photos/pixera_logo.png', alt: 'Photo 5' };
  const [quote, setQuote] = useState(null);
  const quote_id = useParams().quote_id;

  const fetchInfo = async () => {

    try {
      const response = await fetch(`/proposal/${quote_id}`, {
        method: 'POST',
      });

      if (response.status === 404) {
        alert('ERROR: sending request');
      } else if (response.status === 200) {
        const data = await response.json();
        setQuote(data);
        console.log(data);
      } else {
        alert("This didn't work");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const acceptRequest = async () => {

    try {
      const response = await fetch(`/proposal/${quote_id}/accept`, {
        method: 'POST', // Use POST method to accept the quote
      });

      if (response.status === 404) {
        alert('ERROR: sending request');
      } else if (response.status === 200) {
        alert(
          'Thank you for accepting the request! The quote has been marked as accepted.'
        );
      } else {
        alert("This didn't work");
      }
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []); // Empty dependency array means this effect runs once when the component mounts

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
            <Button
              type="submit"
              variant="contained"
              fullWidth
              onClick={acceptRequest}
            >
              Accept
            </Button>

            <Link href="/home" variant="body2">
              <Button type="submit" variant="contained" fullWidth>
                Decline
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

export default Proposal;
