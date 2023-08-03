import Swal from 'sweetalert2';

const handleRegisterResponse = (res) => {
  const isErrorResponse = res.name === "AxiosError";
  const status = isErrorResponse ? res.response.status : res.status;
  const message = isErrorResponse ? res.response.data : res.data;
  switch (status) {
    case 200:
      Swal.fire({
        icon: 'success',
        title: 'Registro Exitoso!',
        text: 'Se ha enviado un correo electrónico con el código de verificación.',
        showConfirmButton: true,
        timer: 2000,
      });
      break;

    case 400:
      if (
        message?.includes(
          'User validation failed: password: La contraseña debe tener al menos 8 caracteres',
        )
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Contraseña poco segura',
          text: 'Mínimo 8 carácteres',
          showConfirmButton: false,
          timer: 1500,
        });
      }

      if (
        message?.includes(
          'User validation failed: telefono: no es un número de teléfono válido',
        )
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Teléfono no válido',
          text: 'Por favor, introduce un número de teléfono válido.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (message?.includes('User validation failed: email: Email no válido')) {
        Swal.fire({
          icon: 'error',
          title: 'Correo no válido',
          text: 'Por favor, introduce un correo electrónico válido.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      break;

    case 409:
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Este correo ya está registrado ❌',
        showConfirmButton: false,
        timer: 3000,
      });
      break;

    case 500:
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Internal error ❌',
        showConfirmButton: false,
        timer: 1500,
      });
      break;

    default:
      break;
  }
};

export default handleRegisterResponse;
