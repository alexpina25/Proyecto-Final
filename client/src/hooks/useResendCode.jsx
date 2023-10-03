import { useState, useEffect } from 'react';
import { resendCodeConfirmationUser } from '../services/user.service';
import { useToast } from '@chakra-ui/react'; // Asegúrate de tener este paquete o usa otro toast que te guste

export const useResendCode = () => {
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(null);
  const toast = useToast();

  // Chequeo del timer almacenado en localStorage
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

  // Decremento del timer
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

  const resendCode = async ({ email, token }) => {
    if (!email && !token)
      return {
        success: false,
        message: 'Necesitas proporcionar un email o un token.',
      };

    const decodedToken = token ? decodeURIComponent(token) : null;

    const identifier = email || decodedToken;
    if (timer > 0)
      return { success: false, message: 'Espera antes de reenviar.' };

    setIsResending(true);
    try {
      const response = await resendCodeConfirmationUser(decodedToken, email);

      if (response && response.data) {
        toast({
          title: 'Código reenviado!',
          description:
            'Se ha reenviado un correo electrónico con el código de verificación.',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        setIsResending(false);
        setTimer(5);
        localStorage.setItem('timer', Date.now() + 5 * 1000);
      } else {
        toast({
          title: 'Ocurrió un error',
          description:
            'No se pudo reenviar el código de verificación. Por favor inténtelo de nuevo.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        setIsResending(false);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Ocurrió un error',
        description:
          'Ha ocurrido un error al realizar la petición. Por favor inténtelo de nuevo.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      setIsResending(false);
    }
  };

  return {
    isResending,
    timer,
    resendCode,
  };
};
