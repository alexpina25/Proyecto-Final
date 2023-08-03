const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connect } = require("./src/utils/db");
const { configCloudinary } = require("./src/middleware/files.middleware");

// Configuración de dotenv
dotenv.config();

// Configuración de URL y puerto
const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT;

// Conexión a la base de datos
connect();

// Configuración de la aplicación express
const app = express();

// Configuración de Cloudinary
configCloudinary();

// Configuración de CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Configuración de límites de recepción y envío de datos
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: false }));

// Configuración de Cookie Parser
app.use(cookieParser());

// Rutas
app.use("/api/v1/users", require("./src/api/routes/user.routes"));
app.use("/api/v1/negocios", require("./src/api/routes/negocio.routes"));
app.use("/api/v1/servicios", require("./src/api/routes/servicio.routes"));

// Manejo de rutas no encontradas
app.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  return next(error);
});

// Manejo de errores 500 del servidor
app.use((error, req, res) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Unexpected error");
});

// Desactivar el encabezado "X-Powered-By"
app.disable("x-powered-by");

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Listening on ${BASE_URL}:${PORT}`);
});
