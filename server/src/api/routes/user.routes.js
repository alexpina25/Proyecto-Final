const { isAuth } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/files.middleware");
const {
  register,
  sendCode,
  login,
  changePassword,
  sendPassword,
  modifyPassword,
  update,
  deleteUser,
  resendCode,
  checkNewUser,
} = require("../controllers/user.controllers");

const express = require("express");
const UserRoutes = express.Router();

UserRoutes.post("/register", upload.single("image"), register);
UserRoutes.post("/resend", resendCode);
UserRoutes.get("/forgotpassword", changePassword);
UserRoutes.post("/login", login);
UserRoutes.patch("/changepassword", [isAuth], modifyPassword);
UserRoutes.patch("/update/update", [isAuth], upload.single("image"), update);
UserRoutes.delete("/delete", [isAuth], deleteUser);
UserRoutes.post("/check", checkNewUser);

//!---------------- REDIRECT-------------------------------
UserRoutes.get("/register/sendMail/:id", sendCode);
UserRoutes.get("/sendPassword/:id", sendPassword);
module.exports = UserRoutes;
