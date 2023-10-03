const mongoose = require("mongoose");
const validator = require("validator");

const NegocioSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nombre: { type: String, required: true, unique: true },
    ubicacion: {
      direccion: { type: String, required: true },
      ciudad: { type: String, required: true },
      provincia: { type: String, required: true },
      codigoPostal: { type: String, required: true },
      lat: { type: Number },
      lng: { type: Number },
    },
    telefono: { type: String, required: true },
    email_negocio: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Email not valid"],
    },
    category: [
      {
        type: String,
        enum: [
          "Peluqueria",
          "Salon de uñas",
          "Maquillaje",
          "Barberia",
          "Entrenador personal",
          "Masajes",
          "Spa",
          "Cuidado de piel",
          "Tatuajes",
          "Cuidado de pies",
          "Cejas y pestañas",
          "Depilación",
          "Salud mental",
          "Otros",
        ],
        required: true,
      },
    ],
    descripcion: { type: String },
    horario: [
      {
        dia: { type: String, required: true },
        abreMañana: { type: String, required: true },
        cierraMañana: { type: String, required: true },
        abreTarde: { type: String },
        cierraTarde: { type: String },
      },
    ],
    servicios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Servicio" }],
    reservas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reserva" }],
    imagenes: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Negocio", NegocioSchema);
