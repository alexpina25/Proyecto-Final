import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { useAuth } from "../contexts/authContext";
import FigureUser from "./FigureUser";
import "./FormProfile.css";
import Uploadfile from "./Uploadfile";
import { updateUser } from "../services/API_proyect/user.service";
import useUpdateError from "../hooks/useUpdateError";

const FormProfile = () => {
  const { setUser, user } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [changeProfileDataOk, setChangeProfileDataOk] = useState(false);
  const defaultData = {
    name: user?.user,
  };
  //! --------- funcion que controla el formulario-----------------------
  const formSubmit = async (formData) => {
    Swal.fire({
      title: "Are you sure you want to change your data profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(73, 193, 162)",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const inputfile = document.getElementById("file-upload").files;
        let customFormData;

        if (inputfile.length !== 0) {
          customFormData = { ...formData, image: inputfile[0] };
          setSend(true);
          setRes(await updateUser(customFormData));
          setSend(false);
        } else {
          customFormData = { ...formData };
          setSend(true);
          setRes(await updateUser(customFormData));
          setSend(false);
        }
      }
    });
  };

  //! --------------- USEEFFECT  que controla la gestion de errores ----------------------
  useEffect(() => {
    useUpdateError(res, setChangeProfileDataOk, setUser);
  }, [res]);

  //! ---------------- LOS CONDICIONALES CON LOS ESTADOS DE NAVEGACION --------------------

  if (changeProfileDataOk) {
    //! no utilizamos el logout aunque no pasaria nada. No lo utlizo porque da warning
    return <Navigate to="login" />;
  }
  return (
    <>
      <div className="containerProfile">
        <div className="containerDataNoChange">
          <FigureUser user={user} />
        </div>
        <div className="form-wrap formProfile">
          <h1>Change your data profile ♻</h1>
          <p>Please, enter your new data profile</p>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="user_container form-group">
              <input
                className="input_user"
                type="text"
                id="name"
                name="name"
                autoComplete="false"
                defaultValue={defaultData?.name}
                {...register("name", { required: true })}
              />
              <label htmlFor="custom-input" className="custom-placeholder">
                username
              </label>
            </div>
            <Uploadfile />
            <div className="btn_container">
              <button
                className="btn"
                type="submit"
                disabled={send}
                style={{ background: send ? "#49c1a388" : "#49c1a2" }}
              >
                CHANGE DATA PROFILE
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormProfile;
