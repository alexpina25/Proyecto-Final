import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const ProtectedCheck = ({ children }) => {
  //allUser.data.user.check = true

  // user.check = true

  // cuando sea true lo mandamos a la dashboard y no le dejamos entrar en la pagina

  const { user, allUser } = useAuth();

  if (allUser?.data?.user?.check == true || user?.check == true) {
    return children;
  } else {
    return <Navigate to="/verifyCode" />;
  }
};

export default ProtectedCheck;
