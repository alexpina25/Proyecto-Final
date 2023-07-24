import React, { useState, useContext } from "react";
import { TextField, Button, Box } from "@mui/material";
import useUserError from "../hooks/useUserError";
import { loginUser } from '../services/user.service';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({email: "", password: ""});
  const setRegisterOk = useState(false)[1];
  const { userlogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(loginData);
      useUserError(response, setRegisterOk);
      if (response.status === 200) {
        userlogin(response.data);
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