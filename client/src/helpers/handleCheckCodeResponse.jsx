export const handleCheckCodeResponse = (res) => {

  const { response } = res;

  if (res?.status === 200) {
    return {
      status: 'success',
      title: 'Usuario verificado correctamente',
      message: '',
    };
  }

  if (response?.status === 500) {
    return {
      status: 'error',
      title: 'Oops...',
      message: 'Error general al verificar el código!',
    };
  }

  if (response?.status === 400) {
    return {
      status: 'error',
      title: 'Código incorrecto',
      message: 'Vuelve a introducir el código o haz click en reenviar código.',
    };
  }
};
