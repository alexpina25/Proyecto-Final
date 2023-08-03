import React, { useState } from 'react';
import { Button } from '@mui/material';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { requestPasswordReset } from '../services/user.service';

const ForgotPasswordButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    const { value: email } = await Swal.fire({
      title: 'Restablecer la contraseña',
      input: 'email',
      inputLabel: 'Tu correo electrónico',
      inputPlaceholder: 'Ingresa tu correo electrónico aquí',
      confirmButtonText: 'Enviar correo',
      preConfirm: (email) => {
        if (!email) {
          Swal.showValidationMessage(
            'Por favor, ingresa un correo electrónico',
          );
        }
      },
    });

    if (email) {
      setIsLoading(true);
      try {
        await requestPasswordReset({ email });
        setIsLoading(false);

        Swal.fire({
          icon: 'success',
          title: 'Email enviado!',
          text: 'Se ha enviado un correo de restablecimiento de contraseña a tu correo electrónico.',
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        setIsLoading(false);

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al enviar el correo electrónico!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      sx={{ mt: 3 }}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? 'Enviando correo...' : 'He olvidado mi contraseña'}
    </Button>
  );
};

export default ForgotPasswordButton;
