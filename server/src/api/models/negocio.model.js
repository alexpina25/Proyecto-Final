const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const NegocioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    ubicacion: {
      direccion: { type: String, required: true },
      ciudad: { type: String, required: true },
      provincia: { type: String, required: true },
      codigoPostal: { type: String, required: true },
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    telefono: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Email not valid"],
    },
    password: {
      type: String,
      required: true,
      /* minlength: [8, "Min 8 characters"], */ //! Comentado para simplificar las pruebas
    },
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
    confirmationCode: { type: Number, required: true },
    check: { type: Boolean, default: false },
  },
  { timestamps: true }
);

NegocioSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next("Error hashing password", error);
  }
});

module.exports = mongoose.model("Negocio", NegocioSchema);
