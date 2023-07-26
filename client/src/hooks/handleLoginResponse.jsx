import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const handleLoginResponse = (res, setLoginOk, userlogin, navigate) => {
  if (res?.status == 200) {
    const dataCustom = {
      user: res.data.user.name,
      email: res.data.user.email,
      image: res.data.user.image,
      check: res.data.user.check,
    };
    const dataString = JSON.stringify(dataCustom);
    userlogin(dataString);
    setLoginOk(true);
    Swal.fire({
      icon: 'success',
      title: 'Bienvenido!',
      text: 'Te has logueado correctamente',
      showConfirmButton: false,
      timer: 1500,
    });
    return { loginSuccessful: true }; // login was successful
  }

  /* -------------------------------------------------------------------------- */
  /*                                  ERROR 500                                 */
  /* -------------------------------------------------------------------------- */
  if (res?.response?.status == 500) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error al procesar la solicitud',
      showConfirmButton: false,
      timer: 1500,
    });
    return { loginSuccessful: false };
  }
  /* -------------------------------------------------------------------------- */
  /*                          ERROR CORREO NO VALIDADO                          */
  /* -------------------------------------------------------------------------- */
  if (res?.response?.status == 401) {
    if (
      res?.response?.data?.message?.includes(
        'El correo electrónico no ha sido validado',
      )
    ) {
      let _id = res?.response?.data?._id;
      Swal.fire({
        icon: 'error',
        title: 'Correo no validado',
        html: 'Por favor, revisa tu correo electrónico y valida tu cuenta',
        showConfirmButton: true,
        confirmButtonText: 'Ir a verificar correo electrónico',
        showCloseButton: true,
        timer: 5000,
      }).then((result) => {
        // verifica si el cierre fue causado por el botón de confirmación
        if (result.isConfirmed) {
          navigate(`/checkcode/${_id}`); // redirige a /checkcode
        }
      });

      return { loginSuccessful: false };
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                    ERROR EMAIL / CONTRASEÑA INCORRECTOS                    */
  /* -------------------------------------------------------------------------- */
  if (
    res?.response?.data?.message?.includes('Email o contraseña incorrectas')
  ) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Email o contraseña incorrectas',
      showConfirmButton: false,
      timer: 1500,
    });
    return { loginSuccessful: false };
  }
  return { loginSuccessful: false }; // login was not successful
};

export default handleLoginResponse;
