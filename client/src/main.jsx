import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import CheckCode from "./pages/CheckCode.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Perfil from "./pages/Perfil.jsx";
import DetalleNegocio from "./pages/DetalleNegocio.jsx";
import Reservas from "./pages/Reservas.jsx";
import Reserva from "./pages/Reserva.jsx";
import VerReserva from "./pages/VerReserva.jsx";
import Settings from "./pages/Settings.jsx";
import Buscar from "./pages/Buscar.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import FAQ from "./pages/FAQ.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import Cancellation from "./pages/Cancellation.jsx";
import Reviews from "./pages/Reviews.jsx";
import Error404 from "./pages/Error404.jsx";
import { AuthContextProvider } from "./contexts/authContext.jsx";
import { Protected } from "./components/Protected.jsx";
import { ProtectedCheck } from "./components/ProtectedCheck.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
        <Route path="/" element={<App />}>
            <Route index path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/checkcode" element={<CheckCode />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/perfil" element={<Protected><Perfil /></Protected>} />
            <Route path="/negocios/:id" element={<Protected><DetalleNegocio /></Protected>} />
            <Route path="/reservas" element={<Protected><Reserva /></Protected>} />
            <Route path="/reservar" element={<Protected><Reservas /></Protected>} />
            <Route path="/ver-reserva/:id" element={<Protected><VerReserva /></Protected>} />
            <Route path="/settings" element={<Protected><Settings /></Protected>} />
            <Route path="/buscar" element={<Protected><Buscar /></Protected>} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/termsofservice" element={<TermsOfService />} />
            <Route path="/cancellation" element={<Cancellation />} />
            <Route path="/reviews" element={<Protected><Reviews /></Protected>} />
            <Route path="dashboard" element={<Protected><Dashboard /></Protected>} />
            <Route path="*" element={<Error404 />} />
            </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);