const express = require("express");
const router = express.Router();
const { isAuthNegocio, isAuth } = require("../../middleware/auth.middleware");

const {
  getServicios,
  getServicio,
  createServicio,
  updateServicio,
  deleteServicio,
  getServiciosByNegocio,
  getServiciosByName,
} = require("../controllers/servicio.controller");

// Rutas accesibles por usuarios y negocios
router.get("/", isAuth, getServicios);
router.get("/:id", isAuth, getServicio);
router.get("/nombre", isAuth, getServiciosByName); // Query string se pasa como ?nombre=nombreDelServicio

// Rutas accesibles solo por negocios
router.post("/", isAuthNegocio, createServicio);
router.patch("/:id", isAuthNegocio, updateServicio);
router.delete("/:id", isAuthNegocio, deleteServicio);
router.get("/negocio/:id", isAuthNegocio, getServiciosByNegocio); // Obtiene todos los servicios de un negocio específico

module.exports = router;
