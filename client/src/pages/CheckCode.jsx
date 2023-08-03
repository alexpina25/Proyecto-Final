import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import { checkCodeConfirmationUser } from '../services/user.service';
import ResendCodeButton from '../components/resendCodeButton';
import { useParams } from 'react-router-dom';
import { handleCheckCodeResponse } from '../helpers/handleCheckCodeResponse';

const CheckCode = () => {
  const [code, setCode] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  const verify = async (event) => {
    event.preventDefault();

    try {
      const response = await checkCodeConfirmationUser(id, Number(code));
      handleCheckCodeResponse(response);

      if (response?.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      padding={2}
    >
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
        <Button type="submit" fullWidth variant="contained" color="primary">
          Verificar
        </Button>
      </form>
      <ResendCodeButton userId={id} />
    </Box>
  );
};

export default CheckCode;
