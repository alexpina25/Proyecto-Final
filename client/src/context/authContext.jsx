import { createContext, useContext, useEffect, useState } from 'react';
import { getUser, logoutUser } from '../services/user.service';
import { useToast } from '@chakra-ui/react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const userlogin = (data) => {
    setUser(data);
  };

  const logout = async () => {
    try {
      await logoutUser();
      Cookies.remove('token');
      setUser(null);
      toast({
        title: '¡Has cerrado sesión!',
        status: 'error',
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
        const response = await getUser(); // Asegúrate de que esta solicitud envíe el token
        if (response.status === 200) {
          setUser(response.data);
        } else {
          // Manejar casos donde el usuario no está autenticado
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
    userlogin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
