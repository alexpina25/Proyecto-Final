const User = require("../api/models/user.model");
const Negocio = require("../api/models/negocio.model");
const { verifyToken } = require("../utils/token");
const dotenv = require("dotenv");
dotenv.config();

const isAuth = async (req, res, next) => {
  const token = req.cookies.token; // Correctly retrieving the token from cookies

  if (!token) {
    return res.status(401).send({ error: "Unauthorized" }); // Use res.status().send() for consistency
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ email: decoded.email });
    next();
  } catch (error) {
    return res.status(401).send({ error: "Token validation failed" }); // Providing more specific feedback
  }
};

const isAuthOwner = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.user = await Negocio.findById(decoded.id);
    if (req.user.rol !== "admin") {
      return res.status(403).send({ error: "Unauthorized, not admin" }); // 403 for forbidden access
    }
    next();
  } catch (error) {
    return res.status(401).send({ error: "Token validation failed" });
  }
};

module.exports = {
  isAuth,
  isAuthOwner,
};
