import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';

export const Protected = ({ children }) => {
  const { user } = useContext(AuthContext);
  const isAuthenticated = Boolean(user);
  let location = useLocation();

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} />;
};

export default Protected;