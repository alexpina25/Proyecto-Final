import Swal from 'sweetalert2/dist/sweetalert2.all.js';

export const handleCheckCodeResponse = (res) => {
  if (!res) return;

  const { response } = res;

  if (res?.data?.message?.includes('Código de confirmación correcto')) {
    Swal.fire({
      icon: 'success',
      title: 'Usuario verificado correctamente',
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  if (response?.status === 500) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error general al verificar el código!',
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  if (response?.data?.includes('Código incorrecto')) {
    Swal.fire({
      icon: 'error',
      title: 'Código incorrecto',
      text: 'Vuelve a introducir el código o haz click en reenviar código.',
      showConfirmButton: false,
      timer: 2500,
    });
  }
};

export default handleCheckCodeResponse;
