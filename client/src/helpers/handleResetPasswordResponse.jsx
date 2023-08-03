import Swal from 'sweetalert2';

export const handleResetPasswordResponse = (res) => {

  const { response } = res;

  switch (true) {
    case res?.data?.message?.includes('Contraseña actualizada correctamente'):
      Swal.fire({
        icon: 'success',
        title: 'Contraseña cambiada!',
        text: 'Tu contraseña ha sido cambiada correctamente.',
      });
      break;

    case response?.status === 404:
      Swal.fire({
        icon: 'error',
        title: 'Usuario no válido',
        text: 'El usuario para el que intentas restablecer la contraseña no existe.',
      });
      break;

    case response?.status === 403:
      Swal.fire({
        icon: 'error',
        title: 'El cambio de contraseña ya ha sido utilizado',
        text: 'El enlace de restablecimiento de contraseña ya ha sido utilizado. Solicita uno nuevo.',
      });
      break;

    case response?.status === 400 &&
      response?.data?.message?.includes(
        'La contraseña debe tener al menos 8 caracteres',
      ):
      Swal.fire({
        icon: 'error',
        title: 'Contraseña muy corta',
        text: 'La contraseña debe tener al menos 8 caracteres.',
      });
      break;

    case response?.status === 400 &&
      response?.data?.message?.includes('Las contraseñas no coinciden'):
      Swal.fire({
        icon: 'error',
        title: 'Las contraseñas no coinciden',
        text: 'Por favor, asegúrate de que las contraseñas introducidas coinciden.',
      });
      break;

    default:
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha habido un error al restablecer la contraseña!',
      });
      break;
  }
};

export default handleResetPasswordResponse;
