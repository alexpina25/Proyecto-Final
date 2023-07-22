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
    password: {
      type: String,
      required: true,
      /* minlength: [8, "Min 8 characters"], */ //! Comentado para simplificar las pruebas
    },
    categoria: [
      {
        type: String,
        enum: [
          "Peluqueria",
          "Salon de uñas",
          "Maquillajes",
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
    confirmationCode: { type: Number, required: true },
    check: { type: Boolean, default: true }, //! TRUE PARA PRUEBAS
  },
  { timestamps: true }
);

NegocioSchema.pre("save", function (next) {
  try {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  } catch (error) {
    next("Error hashing password", error);
  }
});

module.exports = mongoose.model("Negocio", NegocioSchema);
