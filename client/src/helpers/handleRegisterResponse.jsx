const handleRegisterResponse = (res, toast) => {
  const status = res?.response?.status || res.status;
  const message = res?.response?.data || res.data;

  const showToast = (status, title, description) => {

    toast({
      title,
      description,
      status,
      duration: 1500,
      isClosable: true,
    });
  };

  switch (status) {
    case 200:
      showToast(
        'success',
        'Registro Exitoso!',
        'Se ha enviado un correo electrónico con el código de verificación.',
      );
      break;
    case 400:
      if (message?.includes('La contraseña debe tener al menos 8 caracteres')) {
        showToast('error', 'Contraseña poco segura', 'Mínimo 8 carácteres');
      } else if (message?.includes('no es un número de teléfono válido')) {
        showToast(
          'error',
          'Teléfono no válido',
          'Por favor, introduce un número de teléfono válido.',
        );
      } else if (message?.includes('Email no válido')) {
        showToast(
          'error',
          'Correo no válido',
          'Por favor, introduce un correo electrónico válido.',
        );
      }
      break;
    case 409:
      showToast('error', 'Oops...', 'Este correo ya está registrado ❌');
      break;
    case 500:
      showToast('error', 'Oops...', 'Internal error ❌');
      break;
    default:
      break;
  }
};

export default handleRegisterResponse;
