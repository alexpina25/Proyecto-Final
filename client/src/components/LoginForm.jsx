import React, { useState, useContext } from "react";
import { TextField, Button, Box } from "@mui/material";
import handleLoginResponse from "../hooks/handleLoginResponse";
import { loginUser } from '../services/user.service';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';
import { forgotPasswordUser } from '../services/user.service';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({email: "", password: ""});
  const [registerOk, setRegisterOk] = useState(false);
  const { userlogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(loginData);
      localStorage.setItem('userId', response.response.data.userId);
      localStorage.setItem('email', response.response.data.email);
      handleLoginResponse(response, setRegisterOk, userlogin, navigate);
      if (registerOk) {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleForgotPassword = async () => {
    try {
      await forgotPasswordUser(email);
      navigate('/resetpassword'); // Navega a la página de restablecimiento de contraseña.
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
        sx={{ mt: 3 }}>
        He olvidado mi contraseña
      </Button>
    </Box>
  );
};

export default LoginForm;
