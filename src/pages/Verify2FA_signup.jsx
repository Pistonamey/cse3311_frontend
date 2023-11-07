import React, { useState } from 'react';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";

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

function Verify2FA() {
    const { email } = useParams()
  const logo = { id: 6, url: '/data/photos/pixera_logo.png', alt: 'Photo 5' }
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  const handleVerification = async () => {
    if (!verificationCode) {
      setVerificationResult('Please enter the verification code.');
      return;
    }

    const response = await fetch(`/verify_2fa_signup/${email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ totp_token: verificationCode }),
    });

    if (response.status === 200) {
        setVerificationResult('2FA verification successful! You are now logged in.');
        window.location.href="/home"
      } else {
        setVerificationResult('2FA verification failed. Please check the TOTP token.');
      }
  };

  const handleResend = async () => {
    const response = await fetch(`/resend_2fa/${email}`, {
      method: 'POST',
      headers : {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.status === 200) {
    } else if (response.status === 404) {
        console.log("not sent")
    }

  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <img src={logo.url} alt="" width="140px" height="140px" />
        <h2>Two-Factor Authentication Verification</h2>
        <p>Please enter the verification code sent to your email.</p>
        <form>
          <TextField
            type="text"
            id="totp_token"
            name="totp_token"
            required
            label="Verification Code"
            fullWidth
            margin="normal"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <Button type="button" variant="contained" fullWidth onClick={handleVerification}>
            Verify
          </Button>
        </form>
        {verificationResult && <Typography variant="body2">{verificationResult}</Typography>}
        <p>
          If you haven't received the code or it has expired, you can{' '}
          <Link href="#" variant="body2" onClick={handleResend}>
            resend it
          </Link>
          .
        </p>
      </div>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}

export default Verify2FA;
