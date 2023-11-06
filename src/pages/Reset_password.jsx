import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
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

function ResetPassword() {
    const { token } = useParams();
    const logo = { id: 6, url: '/data/photos/pixera_logo.png', alt: 'Photo 5' };
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const requestBody = {
                new_password: newPassword
            };

            const response = await fetch(`/reset_password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.status === 200) {
                window.location.href = "/"
            } else if (response.status === 400) {
                const data = await response.json();
                setErrorMessage(data.message);
            } else {
                setErrorMessage('An error occurred while resetting the password.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <div>
                <img src={logo.url} alt="" width="140px" height="140px" />
                <h2>Reset Password</h2>
                <form onSubmit={handleFormSubmit}>
                    <TextField
                        type="password"
                        id="new_password"
                        name="new_password"
                        value={newPassword}
                        onChange={handlePasswordChange}
                        required
                        label="New Password"
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" fullWidth>
                        Reset Password
                    </Button>
                    {errorMessage && <Typography variant="body2" color="error">{errorMessage}</Typography>}
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

export default ResetPassword;
