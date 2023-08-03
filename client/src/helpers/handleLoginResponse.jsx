import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { resendCodeConfirmationUser } from '../services/user.service'; // Asegúrate de importar la función correcta

export const handleLoginResponse = (res) => {
  if (!res) return;

  const { response } = res;
  if (res?.status === 200) {
    Swal.fire({
      icon: 'success',
      title: 'Bienvenido!',
      text: 'Te has logueado correctamente',
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  if (response?.status === 500) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error al iniciar sesión!',
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  if (response?.data?.message?.includes('Email o contraseña incorrectas')) {
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: 'Email o contraseña incorrectas',
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  if (
    response?.data?.message?.includes(
      'El correo electrónico no ha sido validado',
    )
  ) {
    let swalInstance = Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: 'El correo electrónico no ha sido validado',
      showConfirmButton: true,
      confirmButtonText: 'Reenviar código',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        swalInstance.update({
          confirmButtonText: 'Enviando código...',
          allowOutsideClick: false,
        });
        return resendCodeConfirmationUser(response?.data?._id)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Código reenviado!',
              text: 'Se ha reenviado un correo electrónico con el código de verificación.',
              showConfirmButton: true,
              timer: 2000,
            });
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'Error al reenviar el código',
              text: 'Ha ocurrido un error al intentar reenviar el código de verificación. Por favor, inténtalo de nuevo más tarde.',
              showConfirmButton: true,
            });
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
    return;
  }
};

export default handleLoginResponse;
