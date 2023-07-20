const mongoose = require("mongoose");

const ReservaSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    servicio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Servicio",
      required: true,
    },
    negocio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Negocio",
      required: true,
    },
    fecha: { type: Date, required: true },
    horaInicio: { type: Date, required: true },
    horaFin: { type: Date, required: true },
    comentarios: { type: String },
    pagada: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reserva", ReservaSchema);
