import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import handleRegisterResponse from '../../helpers/handleRegisterResponse';
import { registerUser } from '../../services/user.service';
import { useToast } from '@chakra-ui/react';

const useRegister = () => {
  const toast = useToast();
  const [registerData, setRegisterData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const register = async (data) => {

    setIsLoading(true);

    let formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    let response;

    try {
      response = await registerUser(formData);
      if (response.status === 200) {
        navigate(`/login`);
      }
    } catch (error) {
      console.error(error);
      response = error.response;
    } finally {
      handleRegisterResponse(response, toast);
      setIsLoading(false);
    }
  };

  return {
    registerData,
    isLoading,
    previewImage,
    handleInputChange,
    handleImageChange,
    register,
  };
};

export default useRegister;
