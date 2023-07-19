import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export const ProtectedGeneral = ({ children }) => {
  // tendremos que traernos el user del contexto

  const { user } = useAuth();

  if (user == null) {
    return <Navigate to="/login" />;
  }

  return children;
};
