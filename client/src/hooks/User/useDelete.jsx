import Swal from 'sweetalert2';
import { deleteUser } from '../../services/user.service';
import { useAuth } from '../../context/authContext';

const useDeleteUser = () => {
  const { logout } = useAuth();

  const handleDeleteUser = async () => {
    try {
      await deleteUser();
      logout();
      Swal.fire({
        icon: 'success',
        title: 'Usuario borrado',
        text: 'Tu cuenta ha sido borrada exitosamente.',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
      // Puedes manejar los errores aquí, quizás mostrar otro Sweet Alert.
    }
  };

  const confirmDeleteUser = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este proceso no puede ser revertido',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteUser();
      }
    });
  };

  return confirmDeleteUser;
};

export default useDeleteUser;
