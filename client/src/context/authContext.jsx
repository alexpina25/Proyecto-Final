import { createContext, useContext, useEffect, useState } from 'react';
import { getUser, logoutUser } from '../services/user.service';
import { useToast } from '@chakra-ui/react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const userLogin = (data) => {
    setUser(data);
    Cookies.set('token', data.token); // Ensure the token is being set in cookies here
  };

  const logout = async () => {
    try {
      await logoutUser();
      Cookies.remove('token');
      setUser(null);
      toast({
        title: 'Session closed successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = Cookies.get('token');
        if (token) {
          const response = await getUser(token); // Ensure this request sends the token
          if (response.status === 200) {
            setUser(response.data);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const value = {
    user,
    loading,
    userLogin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
