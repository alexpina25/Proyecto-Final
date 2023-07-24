import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';

export const ProtectedCheck = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.check) {
    return <Navigate to="/check-email" replace />;
  }

  return children;
}

export default ProtectedCheck;