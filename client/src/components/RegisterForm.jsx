import React, { useState } from 'react';
import { TextField, Button, Box, Avatar, Typography } from '@mui/material';
import { registerUser } from '../services/user.service';
import { useNavigate } from 'react-router-dom';
import handleRegisterResponse from './../helpers/handleRegisterResponse';

export const RegisterForm = () => {
  const [registerData, setRegisterData] = useState({
    name: '',
    telefono: '',
    email: '',
    password: '',
    image: '',
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handleInputChange = (event) => {
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setRegisterData({
      ...registerData,
      image: file,
    });

    // preview de la imagen
    let reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const register = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    let formData = new FormData();
    Object.keys(registerData).forEach((key) => {
      formData.append(key, registerData[key]);
    });

    let response;

    try {
      response = await registerUser(formData);
      if (response.status === 200) {
        navigate(`/check-code/${response.data._id}`);
      }
    } catch (error) {
      console.error(error);
      response = error.response;
    } finally {
      handleRegisterResponse(response);
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={register}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        margin={'auto'}
      >
        <Avatar
          alt="User Image"
          src={previewImage}
          style={{ height: '100px', width: '100px', marginBottom: '15px' }}
        />
        <Typography variant="h6" component="h2" gutterBottom>
          Subir imagen de usuario
        </Typography>
        <input type="file" onChange={handleImageChange} />
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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '15px' }}
          disabled={isLoading}
        >
          {isLoading ? 'Registrando usuario...' : 'Registrarme'}
        </Button>
      </Box>
    </form>
  );
};

export default RegisterForm;
