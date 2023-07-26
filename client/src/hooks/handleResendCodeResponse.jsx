import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { resendCodeConfirmationUser } from "../services/user.service";

const handleResendCodeResponse = async (email) => {
  try {
    const response = await resendCodeConfirmationUser(email);
    if (response.status === 200) {

      // Aquí, puedes mostrar una alerta de éxito al usuario si lo deseas
      Swal.fire({
        icon: "success",
        title: "Código reenviado",
        html: "Por favor, revisa tu correo electrónico para tu nuevo código de confirmación",
        showConfirmButton: true,
        timer: 5000,
      });
    } else {
      // Aquí, manejas los errores que puedan venir de la API
      Swal.fire({
        icon: "error",
        title: "Error",
        html: "Hubo un problema al reenviar tu código de confirmación. Por favor, intenta de nuevo",
        showConfirmButton: true,
      }).then(() => {
      });
    }
  } catch (error) {
    console.error(error);
    // Aquí, manejas cualquier error de red o errores inesperados
    Swal.fire({
      icon: "error",
      title: "Error",
      html: "Hubo un problema al reenviar tu código de confirmación. Por favor, intenta de nuevo",
      showConfirmButton: true,
    });
  }
};

export default handleResendCodeResponse;
