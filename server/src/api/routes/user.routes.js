const { isAuth } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/files.middleware");
const {
  register,
  sendCode,
  login,
  changePassword,
  modifyPassword,
  update,
  deleteUser,
  resendCode,
  checkCode,
} = require("../controllers/user.controllers");

const express = require("express");
const UserRoutes = express.Router();

// Rutas públicas
UserRoutes.post("/register", upload.single("image"), register);
UserRoutes.get("/register/sendCode/:id", sendCode);
UserRoutes.post("/check/:id", checkCode);
UserRoutes.post("/resend", resendCode);
UserRoutes.get("/forgotpassword", changePassword);
UserRoutes.post("/login", login);

// Rutas privadas (requieren autenticación)
UserRoutes.patch("/changepassword", isAuth, modifyPassword);
UserRoutes.patch("/update", isAuth, upload.single("image"), update);
UserRoutes.delete("/delete", isAuth, deleteUser);

module.exports = UserRoutes;
