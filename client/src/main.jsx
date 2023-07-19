import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard.jsx";
import { Protected } from "./components/Protected.jsx";
import Login from "./pages/Login.jsx";
import { Home } from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import CheckCode from "./pages/CheckCode.jsx";
import { AuthContextProvider } from "./contexts/authContext.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ProtectedCheck from "./components/ProtectedCheck.jsx";
import ProtectedCheckChildren from "./components/ProtectedCheckChildren.jsx";
import Profile from "./pages/Profile.jsx";
import { ProtectedGeneral } from "./components/ProtectedGeneral.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<App />}>
            {/* No tienen proteccion de rutas */}
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <Protected>
                  <Profile />
                </Protected>
              }
            />
            <Route
              path="/verifyCode"
              element={
                <ProtectedCheckChildren>
                  <CheckCode />
                </ProtectedCheckChildren>
              }
            />
            <Route path="/forgotpassword" element={<ForgotPassword />} />

            {/* Tiene proteccion de rutas */}
            <Route
              path="/dashboard"
              element={
                <ProtectedGeneral>
                  <ProtectedCheck>
                    <Dashboard />
                  </ProtectedCheck>
                </ProtectedGeneral>
              }
            />

            <Route path="/dashboardN" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
