const mongoose = require("mongoose");
const validator = require("validator");

const NegocioSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nombre: { type: String },
    telefono: { type: String },
    ubicacion: {
      calle: { type: String },
      local: { type: String },
      ciudad: { type: String },
      provincia: { type: String },
      codigoPostal: { type: String },
      lat: { type: Number },
      lng: { type: Number },
    },

    email_negocio: {
      type: String,
      required: true,
      // unique: true,
      validate: [validator.isEmail, "Email not valid"],
    },
    categorias: [
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
      },
    ],
    descripcion: { type: String },
    horario: [
      {
        dia: { type: String },
        abierto: { type: Boolean },
        horarioPartido: { type: Boolean },
        abreManana: { type: String },
        cierraManana: { type: String },
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
