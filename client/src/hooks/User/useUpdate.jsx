import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { updateUser } from '../../services/user.service';
import { useAuth } from '../../context/authContext';

const useUpdate = () => {
  const toast = useToast();
  const { user, userlogin } = useAuth();
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    telefono: '',
  });

  const handleErrors = (field, message) => {
    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }));
    toast({
      title: message,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSave = async (newUserData) => {
    const emptyFields = Object.keys(newUserData).filter(
      (key) => !newUserData[key],
    );

    if (emptyFields.length > 0) {
      emptyFields.forEach((field) => {
        handleErrors(field, 'Este campo no puede estar vacío.');
      });
      return false;
    }

    try {
      const response = await updateUser(newUserData);
      if (response.status === 200) {
        userlogin(response.data.user);
        toast({
          title: 'Campos actualizados correctamente.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        // Limpiar errores solo si la actualización fue exitosa
        setErrors({
          name: '',
          email: '',
          telefono: '',
        });
        return true;
      } else {
        handleErrors('global', 'Ha ocurrido un error al actualizar.');
        return false;
      }
    } catch (error) {
      handleErrors('global', 'Ha ocurrido un error al actualizar.');
      return false;
    }
  };

  return {
    user,
    errors,
    handleSave,
  };
};

export default useUpdate;
