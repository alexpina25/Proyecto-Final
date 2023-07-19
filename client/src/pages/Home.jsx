import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import "./Home.css";

export const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="homeContainer">
      {user !== null ? (
        <h1 className="titleHome">Bienvenido {user.user}</h1>
      ) : (
        <>
          <h1 className="titleHome">
            Por favor registrese para poder acceder a la pagina
          </h1>
          <button className="btn" onClick={() => navigate("/login")}>
            IR A LOGIN
          </button>
        </>
      )}
    </div>
  );
};
