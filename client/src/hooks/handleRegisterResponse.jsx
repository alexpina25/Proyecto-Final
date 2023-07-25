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

  if (res?.response?.status == 409)
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Ya existe este usuario!❌",
      showConfirmButton: false,
      timer: 1500,
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

  //! res --> 404 --> codigo en el envio del codigo

  //! error --> nombre de usuario ya exista // error ---> correo ya existe

  if (
    res?.response?.data?.includes(
      "duplicate key error collection: userProyect.users index: name_1 dup key: { name"
    )
  )
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Elige otro nombre ❌",
      showConfirmButton: false,
      timer: 1500,
    });

  //! error ---> validacion de la contraseña

  if (res?.response?.data?.includes("validation failed: password"))
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Mínimo 8 carácteres, 1 mayúscula, 1 minúscula y un carácter especial ❌",
      showConfirmButton: false,
      timer: 1500,
    });
};

export default handleRegisterResponse;