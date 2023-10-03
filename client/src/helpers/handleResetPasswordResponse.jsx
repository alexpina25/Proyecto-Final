export const handleResetPasswordResponse = (res) => {
  const { response } = res;

  switch (true) {
    case res?.data?.message?.includes('Contraseña actualizada correctamente'):
      return {
        status: 'success',
        title: 'Contraseña cambiada!',
        description: 'Tu contraseña ha sido cambiada correctamente.',
      };

    case response?.status === 404:
      return {
        status: 'error',
        title: 'Usuario no válido',
        description:
          'El usuario para el que intentas restablecer la contraseña no existe.',
      };

    case response?.status === 403:
      return {
        status: 'error',
        title: 'El cambio de contraseña ya ha sido utilizado',
        description:
          'El enlace de restablecimiento de contraseña ya ha sido utilizado. Solicita uno nuevo.',
      };

    case response?.status === 400 &&
      response?.data?.message?.includes(
        'La contraseña debe tener al menos 8 caracteres',
      ):
      return {
        status: 'error',
        title: 'Contraseña muy corta',
        description: 'La contraseña debe tener al menos 8 caracteres.',
      };

    case response?.status === 400 &&
      response?.data?.message?.includes('Las contraseñas no coinciden'):
      return {
        status: 'error',
        title: 'Las contraseñas no coinciden',
        description:
          'Por favor, asegúrate de que las contraseñas introducidas coinciden.',
      };

    default:
      return {
        status: 'error',
        title: 'Oops...',
        description: 'Ha habido un error al restablecer la contraseña!',
      };
  }
};
