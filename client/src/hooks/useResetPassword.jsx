// useResetPassword.js

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPasswordUser } from '../services/user.service';
import { handleResetPasswordResponse } from '../helpers/handleResetPasswordResponse';
import { useToast } from '@chakra-ui/react';

const useResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const displayToast = (config) => {
    toast({
      ...config,
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      displayToast(
        handleResetPasswordResponse({
          response: {
            status: 400,
            data: { message: 'La contraseña debe tener al menos 8 caracteres' },
          },
        }),
      );
      return;
    }

    if (password !== confirmPassword) {
      displayToast(
        handleResetPasswordResponse({
          response: {
            status: 400,
            data: { message: 'Las contraseñas no coinciden' },
          },
        }),
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await resetPasswordUser(token, password);
      displayToast(handleResetPasswordResponse(response));
      navigate('/login');
    } catch (error) {
      displayToast(handleResetPasswordResponse(error));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    password,
    confirmPassword,
    isLoading,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
  };
};

export default useResetPassword;
