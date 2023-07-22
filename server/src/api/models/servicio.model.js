const mongoose = require("mongoose");

const ServicioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String },
    duracion: { type: Number, required: true },
    precio: { type: Number, required: true },
    imagen: { type: String },
    negocio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Negocio",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Servicio", ServicioSchema);
