import { handleLoginResponse } from '../helpers/handleLoginResponse';
import { loginUser } from '../services/user.service';
import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const [status, setStatus] = useState('idle');
  const { userlogin } = useAuth();
  const navigate = useNavigate();

  const login = async (loginData) => {
    // Indica que el login está en proceso
    setStatus('loading');

    try {
      const response = await loginUser(loginData);

      if (response.status === 200) {
        // Guardar el usuario en el contexto
        userlogin(response.data);

        setStatus('succeeded');

        // Handle response and navigate to home page
        handleLoginResponse(response);
        navigate('/');
      } else {
        // If login is unsuccessful, indicate failure status and handle response
        setStatus('failed');
        handleLoginResponse(response);
      }
    } catch (error) {
      // If there's an error (network issues, server down, etc), indicate failure status and handle response
      setStatus('failed');
      handleLoginResponse(error);
    }
  };

  // Expose login function and status
  return { login, status };
};
