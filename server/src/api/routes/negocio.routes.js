const express = require("express");
const router = express.Router();
const { isAuth, isAuthOwner } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/files.middleware");

const {
  createNegocio,
  getNegocios,
  getNegocio,
  updateNegocio,
  deleteNegocio,
  createServicioForNegocio,
  getServiciosForNegocio,
  searchNegocios,
  getNegociosByCategory,
  getReservasByNegocio,
} = require("../controllers/negocio.controllers");

// Rutas para Negocios
router.post("/create", isAuth, upload.single("image"), createNegocio);
router.get("/all", getNegocios);
router.get("/:id", getNegocio);
router.get("/category/:category", getNegociosByCategory);
router.patch("/update/:id", isAuthOwner, updateNegocio);
router.delete("/delete/:id", isAuthOwner, deleteNegocio);

// Rutas para Servicios de Negocios
router.post(
  "/servicios/:id",
  isAuthOwner,
  upload.single("image"),
  createServicioForNegocio
);
router.get("/servicios/:id", isAuthOwner, getServiciosForNegocio);

// Rutas para Reservas de Negocios
router.get("/reservas/:id", isAuthOwner, getReservasByNegocio);

// Ruta para buscar Negocios
router.get("/search/:query", searchNegocios);

module.exports = router;
