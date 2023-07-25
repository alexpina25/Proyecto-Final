import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { checkCodeConfirmationUser } from '../services/user.service';
import Swal from 'sweetalert2';

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
      if (response && response.data) {
        // Muestra una alerta de SweetAlert2
        Swal.fire('Código Verificado!', 'Tu cuenta ha sido verificada exitosamente.', 'success');
        // Navega a la página principal
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Ocurrió un error al verificar el código.', 'error');
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
    </Box>
  );
};

export default CheckCode;