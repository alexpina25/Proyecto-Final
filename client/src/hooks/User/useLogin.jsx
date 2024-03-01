import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/user.service';
import Cookies from 'js-cookie';

export const useLogin = () => {
  const [loginStatus, setLoginStatus] = useState('idle');
  const { userLogin } = useAuth();
  const navigate = useNavigate();

  const login = async (loginData) => {
    setLoginStatus('loading');
    try {
      const response = await loginUser(loginData);
      if (response.status === 200) {
        const { token } = response.data; // Extract the token from the response
        Cookies.set('token', token); // Correctly store the token in Cookies
        userLogin(response.data); // Assume userLogin updates the context/state with user data
        navigate('/'); // Navigate to the homepage or dashboard
        setLoginStatus('success');
      } else {
        setLoginStatus('failed');
      }
    } catch (error) {
      console.error(error);
      setLoginStatus('failed');
    }
  };

  return { login, status: loginStatus };
};
