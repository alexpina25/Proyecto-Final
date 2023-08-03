const express = require("express");
const UserRoutes = express.Router();

const { isAuth } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/files.middleware");
const {
  register,
  login,
  requestPasswordReset,
  resetPassword,
  verifyPassword,
  changePassword,
  update,
  deleteUser,
  resendCode,
  checkCode,
  getUser,
  logout,
} = require("../controllers/user.controllers");

// Public Routes
UserRoutes.post("/register", upload.single("image"), register);
UserRoutes.post("/login", login);
UserRoutes.post("/logout", logout);

UserRoutes.get("/user", getUser);

UserRoutes.post("/resend-code", resendCode);
UserRoutes.post("/check-code/:id", checkCode);

UserRoutes.post("/requestPasswordReset", requestPasswordReset);
UserRoutes.post("/reset-password", resetPassword);

// Private Routes (Require Authentication)
UserRoutes.get("/user", getUser);
UserRoutes.post("/verify-password", isAuth, verifyPassword);
UserRoutes.put("/change-password", isAuth, changePassword);
UserRoutes.put("/update", isAuth, upload.single("image"), update);
UserRoutes.delete("/delete", isAuth, deleteUser);

module.exports = UserRoutes;
