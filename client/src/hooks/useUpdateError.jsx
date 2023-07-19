import Swal from "sweetalert2/dist/sweetalert2.all.js";

const useUpdateError = (res, setChangeProfileDataOk, setUser) => {
  let contador;
  //! if para comprobar con un contador que no tenemos nada en false es decir no se ha actualizado
  if (res?.data) {
    contador = 0;
    res?.data?.testUpdate?.map((item) => {
      for (let clave in item) {
        if (item[clave] == false) {
          contador++;
        }
      }
    });
  }

  //! ---------- 200: cuando se ha actualizado todo
  if (contador == 0) {
    let check = "";
    res?.data?.testUpdate?.forEach((item) => {
      for (let clave in item) {
        if (item[clave] == true) {
          check += `- ${clave} - `;
        }
      }
    });
    setUser(() => null);
    localStorage.removeItem("user");
    setChangeProfileDataOk(() => true);
    Swal.fire({
      icon: "success",
      title: `Update data user✅`,
      text: ` Update: ${check} `,
      showConfirmButton: false,
      timer: 4000,
    });
  }
  //! //! ----------200:  cuando algo no se actualiza
  if (contador > 0) {
    let error = "";
    res?.data?.testUpdate?.forEach((item) => {
      for (let clave in item) {
        if (item[clave] == false) {
          error += `- ${clave} - `;
        }
      }
    });
    Swal.fire({
      icon: "error",
      title: `Error update data user: ${error} ❎`,
      text: "Please, try again.",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //! ----------------- 500 || 404

  if (res?.response?.status == 500 || res?.response?.status == 404)
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Interval Server Error! Don't update user ❎ ",
      showConfirmButton: false,
      timer: 1500,
    });
};

export default useUpdateError;
