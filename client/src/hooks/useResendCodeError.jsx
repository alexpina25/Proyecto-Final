import Swal from "sweetalert2/dist/sweetalert2.all.js";

const useResendCodeError = (res) => {
  //! -------status: 500
  if (res?.response?.status == 500 || res?.response?.status == 404)
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Interval Server Error! Don't send email ❎!",
      showConfirmButton: false,
      timer: 1500,
    });

  //! -------status: 200
  if (res?.status == 200)
    Swal.fire({
      icon: "success",
      title: "Ok send email with your code ✅",
      showConfirmButton: false,
      timer: 1500,
    });
};

export default useResendCodeError;
