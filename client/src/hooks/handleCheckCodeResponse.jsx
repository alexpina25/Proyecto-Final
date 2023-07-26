import Swal from "sweetalert2/dist/sweetalert2.all.js";

const handleCheckCodeResponse = (res) => {

  if (res?.status === 200) {
    Swal.fire({
      icon: "success",
      title: "Usuario verificado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  if (res?.response?.status == 500)
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error general al verificar el código!",
      showConfirmButton: false,
      timer: 1500,
    });

  if (res?.response?.data?.includes("Código incorrecto")) {
    Swal.fire({
      icon: "error",
      title: "Código incorrecto",
      text: "Vuelve a introducir el código o haz click en reenviar código.",
      showConfirmButton: false,
      timer: 2500,
    });
  }
};

export default handleCheckCodeResponse;
