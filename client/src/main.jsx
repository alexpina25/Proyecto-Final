import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

// Componentes y contexto
import App from './App.jsx';
import { AuthContextProvider } from './context/authContext.jsx';
import { Protected } from './components/User/Protected.jsx';

// Páginas comunes
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage.jsx';
import Error404 from './pages/Error404.jsx';

// Páginas de usuario
import Login from './pages/User/Login.jsx';
import Register from './pages/User/Register.jsx';
import CheckCode from './pages/User/CheckCode.jsx';
import Perfil from './pages/User/Perfil.jsx';
import ResetPassword from './pages/User/ResetPassword.jsx';

// Páginas de negocio
import Negocios from './pages/Negocio/Negocios.jsx';
import DetallesNegocio from './pages/Negocio/DetallesNegocio.jsx';
import CrearNegocio from './pages/Negocio/CrearNegocio.jsx';
import EditarNegocio from './pages/Negocio/EditarNegocio.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<App />}>
          --------------------------------------------------------------------------
          */ /* PUBLIC ROUTES */ /*
          --------------------------------------------------------------------------
          <Route index path="/" element={<LandingPage />} />
          --------------------------------------------------------------------------
          */ /* USER ROUTES */ /*
          --------------------------------------------------------------------------
          <Route path="/login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/check-code" element={<CheckCode />} />
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
          <Route index path="/negocios" element={<Negocios />} />
          <Route path="/negocios/detalles/:id" element={<DetallesNegocio />} />
          <Route
            path="/alta-negocio"
            element={
              <Protected>
                <CrearNegocio />
              </Protected>
            }
          />
          <Route
            path="/negocios/editar/:id"
            element={
              <Protected>
                <EditarNegocio />
              </Protected>
            }
          />
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
