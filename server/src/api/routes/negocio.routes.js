const express = require("express");
const router = express.Router();
const { isAuthNegocio } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/files.middleware");

const {
  register,
  resendCode,
  sendCode,
  login,
  forgotPassword,
  modifyPassword,
  updateNegocio,
  deleteNegocio,
  checkCode,
  getNegocio,
  getNegociosByCategory,
  getReservasByNegocio,
} = require("../controllers/negocio.controllers");

// Rutas para Negocios
router.post("/register", upload.single("image"), register);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.patch("/modifyPassword/:id", isAuthNegocio, modifyPassword);
router.patch("/update/:id", isAuthNegocio, updateNegocio);
router.delete("/delete/:id", isAuthNegocio, deleteNegocio);

// Rutas para la confirmación de correo
router.get("/register/sendCode/:id", sendCode);
router.post("/resendCode", resendCode);
router.get("/check/:id", checkCode);

// Rutas para obtener datos
router.get("/:id", isAuthNegocio, getNegocio);
router.get("/category/:category", isAuthNegocio, getNegociosByCategory);
router.get("/reservas/:id", isAuthNegocio, getReservasByNegocio);

module.exports = router;
