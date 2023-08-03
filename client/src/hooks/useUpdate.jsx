import { useState } from 'react';
import { updateUser } from '../services/user.service';
import { useAuth } from '../context/authContext';
import handleUpdateResponse from '../helpers/handleUpdateResponse';
import Swal from 'sweetalert2';

const useUpdate = (user) => {
  const { userlogin } = useAuth();
  const [invalidFields, setInvalidFields] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [fieldValues, setFieldValues] = useState({
    name: user.name,
    email: user.email,
    telefono: user.telefono,
  });

  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    telefono: false,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    telefono: '',
  });

  const [successes, setSuccesses] = useState({
    name: '',
    email: '',
    telefono: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);

    // preview de la imagen
    let reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const toggleEditMode = (field) => {
    setEditMode((prevState) => ({ ...prevState, [field]: !prevState[field] }));
  };

  const handleBlur = (field, value) => {
    setFieldValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));

    let error = '';
    if (field === 'name' && !value) {
      error = 'El nombre no puede estar vacío';
    } else if (field === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
      error = 'El correo no es válido';
    } else if (field === 'telefono' && !/^\d{9}$/.test(value)) {
      error = 'El teléfono no es válido';
    }

    setErrors((prevState) => ({
      ...prevState,
      [field]: error,
    }));

    setInvalidFields((prevState) => ({
      ...prevState,
      [field]: !!error,
    }));
  };

  const handleSaveImage = async (imageFile) => {
    setIsUpdating(true);
    let swalInstance = Swal.fire({
      title: 'Actualizando imagen...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      const response = await updateUser(formData);

      if (response.status === 200) {
        userlogin((prevUser) => ({
          ...prevUser,
          image: URL.createObjectURL(imageFile),
        }));
        setSuccesses((prev) => ({
          ...prev,
          image: 'Imagen actualizada correctamente',
        }));

        swalInstance.close();
        Swal.fire('¡Éxito!', 'Imagen actualizada', 'success');
        setImageFile(null);
        setIsUpdating(false);
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, image: error.response }));
      swalInstance.close();
      setIsUpdating(false);
      Swal.fire('Error', 'No se pudo actualizar la imagen', 'error');
    }
  };

  const handleSave = async (field) => {
    if (invalidFields[field]) {
      return;
    }
    if (errors[field]) {
      setTimeout(() => {
        setErrors((prev) => ({
          ...prev,
          [field]: '',
        }));
      }, 5000);
      return;
    }

    const formData = new FormData();
    formData.append(field, fieldValues[field]);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    try {
      const response = await updateUser(formData);
      const result = handleUpdateResponse(response);
      if (result.success) {
        userlogin(response.data.user);
        // removed toggleEditMode call here
        setSuccesses((prev) => ({
          ...prev,
          [field]: 'Campo actualizado correctamente',
        }));

        // Borrar el mensaje de éxito después de 5 segundos
        setTimeout(() => {
          setSuccesses((prev) => ({ ...prev, [field]: '' }));
        }, 5000);

        return true;
      } else {
        setErrors((prev) => ({
          ...prev,
          [field]: result.message,
        }));

        // Borrar el mensaje de error después de 5 segundos
        setTimeout(() => {
          setErrors((prev) => ({ ...prev, [field]: '' }));
        }, 5000);
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    user,
    editMode,
    errors,
    successes,
    imageFile,
    previewImage,
    isUpdating,
    handleSaveImage,
    handleImageChange,
    handleBlur,
    handleSave,
    toggleEditMode,
  };
};

export default useUpdate;
