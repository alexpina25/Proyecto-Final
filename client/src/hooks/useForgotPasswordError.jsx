import Swal from "sweetalert2/dist/sweetalert2.all.js";

const useForgotPasswordError = (res, setForgetOk) => {
  //! ------------------- 200 => {sendPassword: true, updateUser: true} && 200 => {updateUser: false, sendPassword: true}

  if (res?.status == 200) {
    if (res?.data?.sendPassword == true && res?.data?.updateUser == true) {
      setForgetOk(() => true);
      return Swal.fire({
        icon: "success",
        title: "Change password ok",
        text: "Send email with your new password ✅",
        showConfirmButton: false,
        timer: 3000,
      });
    }

    if (res?.data?.sendPassword == true && res?.data?.updateUser == false) {
      return Swal.fire({
        icon: "error",
        title: "Error send incorrect email",
        text: "We don't change your password, your email isn't valid ❎",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
  //! ------------------- 404 => User no register -
  if (
    res?.response?.data?.includes("User no register") &&
    res?.response?.status == 404
  )
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "User no register ❎. Enter a valid email address",
      showConfirmButton: false,
      timer: 3000,
    });

  //! ------------------- 500 => Interval Server Error
  if (res?.response?.status == 500)
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Internal server error ❎, please try again ",
      showConfirmButton: false,
      timer: 1500,
    });

  //! ------------------- 404 => 'dont send email and dont update user'
  if (
    res?.response?.data?.includes("dont send email and dont update user") &&
    res?.response?.status == 404
  )
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No update password,  ❎ Try again, please",
      showConfirmButton: false,
      timer: 3000,
    });
};

export default useForgotPasswordError;
