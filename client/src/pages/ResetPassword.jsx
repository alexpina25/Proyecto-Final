import React, { useState } from 'react';
import { TextField, Box, Button, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPasswordUser } from '../services/user.service';
import { handleResetPasswordResponse } from './../helpers/handleResetPasswordResponse';

const ResetPassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      handleResetPasswordResponse({
        response: {
          status: 400,
          data: { message: 'La contraseña debe tener al menos 8 caracteres' },
        },
      });
      return;
    }

    if (password !== confirmPassword) {
      handleResetPasswordResponse({
        response: {
          status: 400,
          data: { message: 'Las contraseñas no coinciden' },
        },
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await resetPasswordUser(token, password);
      setIsLoading(false);
      handleResetPasswordResponse(response);
      navigate('/login');
    } catch (error) {
      setIsLoading(false);
      handleResetPasswordResponse(error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      padding={2}
    >
      <Typography variant="h4">Restablecer la contraseña</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Nueva Contraseña"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirmar Contraseña"
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          {isLoading ? 'Enviando...' : 'Cambiar contraseña'}
        </Button>
      </form>
    </Box>
  );
};

export default ResetPassword;
