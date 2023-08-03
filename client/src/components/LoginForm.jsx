import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useLogin } from '../hooks/useLogin';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const { login, status } = useLogin();

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(loginData);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="E-mail"
          name="email"
          autoComplete="email"
          autoFocus
          value={loginData.email}
          onChange={handleInputChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={loginData.password}
          onChange={handleInputChange}
        />
        <Button type="submit" variant="contained" color="primary" disabled={status === 'loading'}>
          {status === 'loading' ? 'Loading...' : 'Sign In'}
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
