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
    horaInicio: { type: Date, required: true },
    horaFin: { type: Date, required: true },
    comentarios: { type: String },
    estado: {
      type: String,
      enum: ["pagada", "confirmada", "cancelada", "retrasada", "adelantada"],
      default: "confirmada",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reserva", ReservaSchema);
