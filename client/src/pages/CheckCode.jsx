import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { checkCodeConfirmationUser, resendCodeConfirmationUser } from '../services/user.service';
import handleCheckCodeResponse from '../hooks/handleCheckCodeResponse';
import handleResendCodeResponse from '../hooks/handleResendCodeResponse';

const CheckCode = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  const verify = async (event) => {
    event.preventDefault();

    try {
      const userId = localStorage.getItem("userId");
      const response = await checkCodeConfirmationUser(userId, Number(code));

      handleCheckCodeResponse(response, userId);

      if (response && response.data) {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const resendCode = async (event) => {
    event.preventDefault();

    try {
      const email = localStorage.getItem("email");
      handleResendCodeResponse(email);
    } catch (error) {
      console.error(error);
    }

  };
  return (
    <Box display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    height="100vh"
    padding={2}>
      <h1>Verificar Código</h1>
      <form onSubmit={verify}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="confirmationCode"
          label="Código de Verificación"
          name="confirmationCode"
          autoFocus
          onChange={handleInputChange}
          value={code}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Verificar
        </Button>
      </form>
      <Button
        onClick={resendCode}
        variant="contained"
        color="secondary"
        sx={{ mt: 3 }}>
        Reenviar Código
      </Button>
    </Box>
  );
};

export default CheckCode;