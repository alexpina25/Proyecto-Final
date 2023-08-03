import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { getUser, resendCodeConfirmationUser } from '../services/user.service';
import Swal from 'sweetalert2';

const ResendCodeButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser();
      setUser(response.data);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const storedTime = localStorage.getItem('timer');
    if (storedTime) {
      const remainingTime = Math.floor((storedTime - Date.now()) / 1000);
      if (remainingTime > 0) {
        setTimer((prevTimer) => (prevTimer ? prevTimer : remainingTime));
      } else {
        localStorage.removeItem('timer');
      }
    }
  }, []);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else if (timer !== null) {
      localStorage.removeItem('timer');
    }
    return () => clearInterval(interval);
  }, [timer]);

  const resendCode = async (event) => {
    if (timer > 0) return;

    setIsLoading(true);
    event.preventDefault();
    
    try {
      const response = await resendCodeConfirmationUser(user.userId);

      if (response && response.data) {
        Swal.fire({
          icon: 'success',
          title: 'Código reenviado!',
          text: 'Se ha reenviado un correo electrónico con el código de verificación.',
          showConfirmButton: true,
          timer: 2000,
        });
        setIsLoading(false);
        setTimer(30);
        localStorage.setItem('timer', Date.now() + 30 * 1000);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error',
          text: 'No se pudo reenviar el código de verificación. Por favor, inténtalo de nuevo más tarde.',
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      onClick={resendCode}
      disabled={isLoading || timer > 0}
      variant="contained"
      color="secondary"
      style={{ marginTop: '1rem' }}
    >
      {isLoading
        ? 'Cargando...'
        : timer > 0
        ? `Espera ${timer} segundos`
        : 'Reenviar Código'}
    </Button>
  );
};

export default ResendCodeButton;
