import Swal from "sweetalert2/dist/sweetalert2.all.js";

const handleLoginResponse = (res, setLoginOk, userlogin, navigate) => {

  if (res?.response?.status == 500) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Interval Server Error!",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  if (res?.status == 200) {
    const dataCustom = {
      token: res.data.token,
      user: res.data.user.name,
      email: res.data.user.email,
      image: res.data.user.image,
      check: res.data.user.check,
    };

    const dataString = JSON.stringify(dataCustom);
    userlogin(dataString);
    setLoginOk(true);
    Swal.fire({
      icon: "success",
      title: "Bienvenido!",
      text: "Te has logueado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  if (res?.response?.data?.message.includes("La contraseña es incorrecta")) {
    Swal.fire({
      icon: "error",
      title: "Contraseña incorrecta",
      html: "Vuelve a introducir la contraseña o haz click en <strong>'He olvidado mi contraseña'</strong>",
      showConfirmButton: true,
      timer: 5000,
    });
  }

  if (res?.response?.data?.message.includes("El correo electrónico no ha sido validado")) {
    Swal.fire({
      icon: "error",
      title: "Correo no validado",
      html: "Por favor, revisa tu correo electrónico y valida tu cuenta",
      showConfirmButton: true,
      confirmButtonText: 'Ir a verificar correo electrónico',
      showCloseButton: true,
      timer: 5000,
    }).then((result) => {
      // Si el usuario hizo clic en 'Reenviar Código', entonces...
      if (result.isConfirmed) {
        const userId = localStorage.getItem("userId");
        // Llama a resendCode pasando el correo electrónico del usuario
        navigate(`/checkcode/${userId}`);
      }
    });
  }
  if (res?.response?.data?.message.includes("Usuario no registrado")) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Usuario no registrado",
      showConfirmButton: false,
      timer: 2000,
    });
  }
};

export default handleLoginResponse;