import React, { useContext } from 'react';
import { Button } from "@mui/material";
import { AuthContext } from '../contexts/authContext';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div>
      <h1>Dashboard</h1>

      <h2>Bienvenido, {user ? user.user.name : 'Guest'}!</h2>
      {user && <Button onClick={logout} variant="contained" color="secondary">Cerrar Sesión</Button>}
    </div>
  );
};

export default Dashboard;
