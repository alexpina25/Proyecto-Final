import React, { useState, useContext } from "react";
import { TextField, Button, Box } from "@mui/material";
import handleLoginResponse from "../hooks/handleLoginResponse";
import { loginUser } from '../services/user.service';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';

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
      await handleLoginResponse(response, setRegisterOk, userlogin);
      if (registerOk) {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={login}>
      <Box>
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
        <Button type="submit" fullWidth variant="contained" color="primary">
          Sign In
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
