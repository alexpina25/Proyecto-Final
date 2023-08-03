import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import LoadingSpinner from '../components/LoadingSpinner';

export const Protected = ({ children }) => {
  const { user, loading } = useContext(AuthContext); // Desestructura la carga del contexto
  const isAuthenticated = Boolean(user);
  let location = useLocation();

  if (loading) {
    return <LoadingSpinner />; // O cualquier otro componente de carga
  }

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} />;
};
