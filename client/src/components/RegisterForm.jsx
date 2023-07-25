import React, { useState } from "react";
import { TextField, Button, Box, Avatar, Typography } from "@mui/material";
import { registerUser } from '../services/user.service';
import { useNavigate } from 'react-router-dom';
import handleRegisterResponse from './../hooks/handleRegisterResponse';

const RegisterForm = () => {
  const [registerData, setRegisterData] = useState({email: "", name: "", password: "", telefono: "", image: null});
  const [registerOk, setRegisterOk] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setRegisterData({ ...registerData, image: file });
      setPreviewImage(reader.result);
    }

    reader.readAsDataURL(file);
  }

  const register = async (event) => {
    event.preventDefault();
    try {
      const response = await registerUser(registerData);
      const userId = response.data.user._id;
      
      if(response && response.data) {
        handleRegisterResponse(response, setRegisterOk);
        // Navega a la página CheckCode
        navigate(`/checkcode/${userId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={register}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar alt="User Image" src={previewImage} style={{height: '100px', width: '100px', marginBottom: '15px'}}/>
        <Typography variant="h6" component="h2" gutterBottom>
          Subir imagen de usuario
        </Typography>
        <input type="file" onChange={handleImageChange}/>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="name"
          label="Nombre de usuario"
          name="name"
          autoComplete="name"
          value={registerData.name}
          onChange={handleInputChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="telefono"
          label="Teléfono"
          name="telefono"
          autoComplete="telefono"
          value={registerData.telefono}
          onChange={handleInputChange}
          />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="E-mail"
          name="email"
          autoComplete="email"
          value={registerData.email}
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
          value={registerData.password}
          onChange={handleInputChange}
        />

        <Button type="submit" fullWidth variant="contained" color="primary" style={{marginTop: '15px'}}>
          Sign Up
        </Button>
      </Box>
    </form>
  );
};

export default RegisterForm;
