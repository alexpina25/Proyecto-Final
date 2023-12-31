const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email del usuario requerido"],
      trim: true,
      unique: [true, "El email ya está registrado"],
      validate: [validator.isEmail, "Email no válido"],
    },
    name: {
      type: String,
      required: [true, "Nombre del usuario requerido"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Contraseña requerida"],
      minlength: [8, "La contraseña debe tener al menos 8 caracteres"],
    },
    rol: {
      type: String,
      enum: ["client", "owner", "both"],
      default: "client",
    },
    confirmationCode: {
      type: Number,
      required: [true, "Código de confirmación requerido"],
    },
    lastPasswordReset: { type: Date },
    check: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    telefono: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\d{9}$/.test(v);
        },
        message: `no es un número de teléfono válido`,
      },
      required: [true, "Número de teléfono del usuario requerido"],
    },
    reservas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reserva",
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } catch (error) {
      next("Error hashing password", error);
    }
  } else {
    next();
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
