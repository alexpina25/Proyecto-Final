export const handleLoginResponse = (res) => {
  if (!res) return;

  const { response } = res;

  if (res?.status === 200) {
    return {
      status: 'success',
      title: 'Bienvenido!',
      message: 'Te has logueado correctamente',
    };
  }

  if (res?.status === 500) {
    return {
      status: 'error',
      title: 'Error!',
      message: 'Error al iniciar sesión.',
    };
  }

  if (response?.data?.message?.includes('Email o contraseña incorrectas')) {
    return {
      status: 'error',
      title: 'Error...',
      message: 'Email o contraseña incorrectas',
    };
  }

  if (
    res.response?.data?.message?.includes(
      'El correo electrónico no ha sido validado',
    )
  ) {
    return {
      status: 'error',
      title: 'Error...',
      message: 'El correo electrónico no ha sido validado',
    };
  }
};

export default handleLoginResponse;
