import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CheckCode from './pages/CheckCode.jsx';
import Perfil from './pages/Perfil.jsx';
import ResetPassword from './pages/ResetPassword.jsx';

import Error404 from './pages/Error404.jsx';
import { AuthContextProvider } from './context/authContext.jsx';
import { Protected } from './components/Protected.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<App />}>
          --------------------------------------------------------------------------
          */ /* PUBLIC ROUTES */ /*
          --------------------------------------------------------------------------
          <Route index path="/" element={<Home />} />
          --------------------------------------------------------------------------
          */ /* USER ROUTES */ /*
          --------------------------------------------------------------------------
          <Route path="/login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/check-code/:id" element={<CheckCode />} />
          <Route path="/reset-password/" element={<ResetPassword />} />
          <Route
            path="/perfil"
            element={
              <Protected>
                <Perfil />
              </Protected>
            }
          />
          --------------------------------------------------------------------------
          */ /* NEGOCIO ROUTES */ /*
          --------------------------------------------------------------------------
          --------------------------------------------------------------------------
          */ /* SERVICIO ROUTES */ /*
          --------------------------------------------------------------------------
          --------------------------------------------------------------------------
          */ /* RESERVA ROUTES */ /*
          --------------------------------------------------------------------------
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  </BrowserRouter>,
);
