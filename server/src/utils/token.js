const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateToken = (id, email) => {
  if (!id || !email) {
    throw new Error("Email o id no encontrado");
  }

  return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const generateTokenFull = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
      image: user.image,
      telefono: user.telefono,
      reservas: user.reservas,
      check: user.check,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};
const verifyToken = (token) => {
  if (!token) {
    throw new Error("No se encuentra la cookie del token");
  }

  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateToken,
  generateTokenFull,
  verifyToken,
};
