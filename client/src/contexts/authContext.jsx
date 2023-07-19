import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  //! -----> TENEMOS UN ESTADO DEL USUARIO EN GENERAL ---------------------------
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("user");
    const parseUser = JSON.parse(data);

    if (data) {
      return parseUser;
    } else {
      return null;
    }
  });

  //! -------> ESTE ESTADO SIRVE SOLO PARA EL REGISTER PARA SETEAR LA RESPUESTA--------
  //! ----------------Puede utlizarase como estado de transicion( estado que nos sirve para guardar respuestas)
  const [allUser, setAllUser] = useState({
    data: {
      user: {
        password: "",
        email: "",
      },
    },
  });

  //! --------> FUNCION PUENTE PARA SETEAR ESTADOS EN CASO DE TENER PROBLEMAS CON LA ASINCRONIA DE REACT----
  const bridgeData = (state) => {
    const data = localStorage.getItem("data");
    const dataJson = JSON.parse(data);
    switch (state) {
      case "ALLUSER":
        setAllUser(dataJson);
        localStorage.removeItem("data");
        break;

      default:
        break;
    }
  };

  //! GUARDAMOS LA CONTRASEÑA SIN ENCRIPTAR---------

  //! ------------- FUNCION QUE GESTIONA EL LOGIN DEL USER -----------------------------
  const userlogin = (data) => {
    // recibimos la data en formato string, es un objeto
    localStorage.setItem("user", data);
    // parseamos la data que la recibimos en string y la metemos al estado
    const parseData = JSON.parse(data);
    setUser(() => parseData);
  };

  //! ----------------FUNCION QUE GESTIONA EL LOGOUT ----------------------------------------
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      userlogin,
      logout,
      allUser,
      setAllUser,
      bridgeData,
    }),
    [user, allUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook que nos provee del contexto

export const useAuth = () => {
  return useContext(AuthContext);
};
