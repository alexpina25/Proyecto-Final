import Swal from "sweetalert2/dist/sweetalert2.all.js";

const handleLoginResponse = (res, setLoginOk, userlogin) => {

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

  if (res?.response?.data?.includes("La contraseña es incorrecta")) {
    Swal.fire({
      icon: "error",
      title: "Contraseña incorrecta",
      html: "Vuelve a introducir la contraseña o haz click en <strong>'He olvidado mi contraseña'</strong>",
      showConfirmButton: true,
      timer: 5000,
    });
  }

  if (res?.response?.data?.includes("Usuario no registrado")) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Usuario no registrado",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

export default handleLoginResponse;