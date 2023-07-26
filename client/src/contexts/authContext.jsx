import { createContext, useContext, useEffect, useState } from 'react';
import API from '../services/service.config';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const userlogin = (data) => {
    setUser(data);
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
  };
  useEffect(() => {
    const getUser = async () => {
      const token = Cookies.get('token');
      if (!token) {
        return;
      }

      try {
        const response = await API.get('/api/v1/user');

        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.error(
            'Error al obtener la información del usuario desde el servidor',
          );
        }
      } catch (error) {
        console.error(
          'Error al obtener la información del usuario desde el servidor',
          error,
        );
      }
    };

    getUser();
  }, []);

  const value = {
    user,
    userlogin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
