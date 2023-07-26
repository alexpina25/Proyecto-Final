import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import handleLoginResponse from '../hooks/handleLoginResponse';
import { loginUser, forgotPasswordUser } from '../services/user.service';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginOk, setLoginOk] = useState(false);
  const { userlogin } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(loginData);
      if (response) {
        const { loginSuccessful, userId } = handleLoginResponse(
          response,
          setLoginOk,
          userlogin,
          navigate
        );
        if (loginSuccessful) {
          navigate('/');
        } else if (userId) {
          navigate(`/checkcode/${userId}`);
        }
      } else {
        console.error('Error al iniciar sesión');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await forgotPasswordUser(loginData.email);
      navigate('/resetpassword');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <form onSubmit={login}>
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
        <Button type="submit" variant="contained" color="primary">
          Sign In
        </Button>
      </form>

      <Button
        onClick={handleForgotPassword}
        variant="contained"
        color="secondary"
        sx={{ mt: 3 }}
      >
        He olvidado mi contraseña
      </Button>
    </Box>
  );
};

export default LoginForm;
