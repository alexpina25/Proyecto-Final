import { useState } from 'react';
import { requestPasswordReset } from '../../services/user.service';
import { useToast } from '@chakra-ui/react';

const useForgotPassword = (onOpen, onClose) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleForgotPassword = async () => {
    onOpen();
    if (!email) {
      toast({
        title: 'Error',
        description: 'Por favor, introduce una dirección de correo.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    try {
      await requestPasswordReset({ email });
      setIsLoading(false);
      onClose();
      toast({
        title: 'Correo enviado',
        description:
          'Por favor, revisa tu correo para restablecer tu contraseña.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      setIsLoading(false);
      toast({
        title: 'Error',
        description:
          'Hubo un problema enviando el correo. Por favor, inténtalo de nuevo.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return { email, setEmail, isLoading, handleForgotPassword };
};

export default useForgotPassword;
