const express = require("express");
const router = express.Router();
const { isAuthOwner, isAuth } = require("../../middleware/auth.middleware");

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
router.post("/", isAuthOwner, createServicio);
router.patch("/:id", isAuthOwner, updateServicio);
router.delete("/:id", isAuthOwner, deleteServicio);
router.get("/negocio/:id", isAuthOwner, getServiciosByNegocio); // Obtiene todos los servicios de un negocio específico

module.exports = router;
