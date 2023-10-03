const User = require("../api/models/user.model");
const Negocio = require("../api/models/negocio.model");
const { verifyToken } = require("../utils/token");
const dotenv = require("dotenv");
dotenv.config();

const isAuth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new Error("Unauthorized"));
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ email: decoded.email });
    next();
  } catch (error) {
    return next(error);
  }
};

const isAuthOwner = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(new Error("Unauthorized"));
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.user = await Negocio.findById(decoded.id);
    if (req.user.rol !== "admin") {
      return next(new Error("Unauthorized, not admin"));
    }
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  isAuth,
  isAuthOwner,
};
