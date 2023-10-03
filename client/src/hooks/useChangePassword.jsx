import Swal from 'sweetalert2';
import { verifyPassword, changePassword } from '../../services/user.service';

const useChangePassword = () => {
  const handleChangePassword = async () => {
    const steps = ['1', '2', '3'];
    const Queue = Swal.mixin({
      progressSteps: steps,
      confirmButtonText: 'Siguiente >',
      showCloseButton: true,
      showClass: { backdrop: 'swal2-noanimation' },
      hideClass: { backdrop: 'swal2-noanimation' },
    });

    const { value: oldPassword } = await Queue.fire({
      title: 'Contraseña actual',
      text: 'Por favor, introduce tu contraseña actual',
      input: 'password',
      currentProgressStep: 0,
      showClass: { backdrop: 'swal2-noanimation' },
    });

    if (oldPassword && oldPassword !== '') {
      try {
        const response = await verifyPassword(oldPassword);
        if (response.status === 200) {
          const { value: newPassword } = await Queue.fire({
            title: 'Nueva contraseña',
            text: 'Por favor, introduce tu nueva contraseña',
            input: 'password',
            inputValidator: (value) => {
              if (!value) {
                return 'Necesitas escribir una contraseña';
              }
            },
            currentProgressStep: 1,
          });

          if (newPassword) {
            const { value: confirmPassword } = await Queue.fire({
              title: 'Confirmar nueva contraseña',
              text: 'Por favor, confirma tu nueva contraseña',
              input: 'password',
              inputValidator: (value) => {
                if (!value) {
                  return 'Necesitas confirmar la nueva contraseña';
                }
              },
              currentProgressStep: 2,
            });

            if (confirmPassword && newPassword === confirmPassword) {
              await changePassword(oldPassword, newPassword);
              Swal.fire(
                'Éxito',
                'Contraseña cambiada correctamente',
                'success',
              );
            } else {
              Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
            }
          }
        } else {
          Swal.fire('Error', 'Contraseña incorrecta', 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'Error al verificar la contraseña', 'error');
      }
    }
  };

  return handleChangePassword;
};

export default useChangePassword;
