import { createContext, useContext, useEffect, useState } from 'react';
import { getUser, logoutUser } from '../services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const userlogin = (data) => {
    setUser(data);
  };

  const logout = async () => {
    try {
      await logoutUser();
      Cookies.remove('token');
      setUser(null);
      Swal.fire({
        icon: 'info',
        title: '¡Has cerrado sesión!',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const updateUser = async () => {
      try {
        console.log('Actualizando el usuario...');
        const response = await getUser();
        if (response.status === 200) {
          setUser(response.data);
          console.log('Usuario actualizado');
        } else {
          console.error(
            'Error al obtener la información del usuario desde el servidor',
          );
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    updateUser();
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
