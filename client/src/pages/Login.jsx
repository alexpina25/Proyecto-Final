import React from 'react';
import LoginForm from '../components/LoginForm';
import { Box, Typography } from '@mui/material';
import ForgotPasswordButton from './../components/ForgotPasswordButton';

const LoginPage = () => {
  return (
    <Box textAlign={'center'} paddingLeft={'15%'} paddingRight={'15%'}>
      <Typography variant="h4" component="h1" align="center" marginTop="2%">
        Log in
      </Typography>
      <LoginForm />
      <ForgotPasswordButton />
    </Box>
  );
};

export default LoginPage;
