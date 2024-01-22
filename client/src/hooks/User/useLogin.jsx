import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/user.service';
import { handleLoginResponse } from '../../helpers/handleLoginResponse';

export const useLogin = () => {
  const [loginStatus, setLoginStatus] = useState('idle');
  const { userlogin } = useAuth();
  const navigate = useNavigate();

  const login = async (loginData) => {
    setLoginStatus('loading');

    try {
      const response = await loginUser(loginData);
      const result = handleLoginResponse(response);

      if (response.status === 200) {
        userlogin(response.data);
        navigate('/');
      }

      setLoginStatus(result.status);

      return result;
    } catch (error) {
      const errorResult = handleLoginResponse(error);
      setLoginStatus('failed');
      return errorResult;
    }
  };

  return { login, status: loginStatus };
};
