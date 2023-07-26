import Swal from "sweetalert2/dist/sweetalert2.all.js";

const handleRegisterResponse = (res, setRegisterOk) => {
  //! 200 --->  respuesta ok register ok
  if (res?.status == 200) {
    localStorage.setItem("userId", res.data.user._id);
    setRegisterOk(() => true);
    Swal.fire({
      icon: "success",
      title: "Registro Exitoso!",
      text: "Se ha enviado un correo electrónico con el código de verificación.",
      showConfirmButton: true,
      timer: 2000,
    });
  }

  //! res --> 409 --> Usuario ya registrado
  if (res?.response?.status === 409)
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Este correo ya está registrado ❌",
      showConfirmButton: false,
      timer: 3000,
    });
  //! res --> 500 --> Error general del server

  if (res?.response?.status == 500)
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Internal error ❌",
      showConfirmButton: false,
      timer: 1500,
    });

  //! error ---> validacion de la contraseña

  if (res?.response?.data?.includes("La contraseña debe tener al mínimo 8 caracteres" || "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número"))
    Swal.fire({
      icon: "error",
      title: "Contraseña poco segura",
      text: "Mínimo 8 carácteres, 1 mayúscula, 1 minúscula y un carácter especial.",
      showConfirmButton: false,
      timer: 1500,
    });
};

export default handleRegisterResponse;