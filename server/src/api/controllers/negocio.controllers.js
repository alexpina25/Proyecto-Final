const Negocio = require("../models/negocio.model");
const Reserva = require("../models/reserva.model");
const Servicio = require("../models/servicio.model");
const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const randomCode = require("../../utils/randomCode");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { generateToken } = require("../../utils/token");
const randomPassword = require("../../utils/randomPassword");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;
const BASE_URL_COMPLETE = `${BASE_URL}${PORT}`;

const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_SERVICE = process.env.EMAIL_SERVICE;

//TODO Cambiar imagen a una de un negocio
const DEFAULT_IMAGE_URL = "https://pic.onlinewebfonts.com/svg/img_181369.png";

//! -----------------------------------------------------------------------------
//? ----------------------------REGISTER NEGOCIO---------------------------------
//! -----------------------------------------------------------------------------
const register = async (req, res, next) => {
  try {
    const { email_negocio } = req.body;
    const existingNegocio = await Negocio.findOne({ email_negocio });

    if (existingNegocio) {
      if (req.file) {
        deleteImgCloudinary(req.file.path);
      }
      return res.status(409).json("Este negocio ya existe");
    }

    const confirmationCode = randomCode();
    const negocio = new Negocio({ ...req.body, confirmationCode });

    if (req.file) {
      negocio.image = req.file.path;
    } else {
      negocio.image = DEFAULT_IMAGE_URL;
    }

    try {
      const savedNegocio = await negocio.save();
      if (savedNegocio) {
        return res.redirect(
          `${BASE_URL_COMPLETE}/api/v1/negocios/register/sendCode/${savedNegocio._id}`
        );
      }
    } catch (error) {
      if (req.file) {
        deleteImgCloudinary(req.file.path);
      }
      return res.status(404).json(error.message);
    }
  } catch (error) {
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? ----------------------------LOGIN NEGOCIO------------------------------------
//! -----------------------------------------------------------------------------
const login = async (req, res) => {
  try {
    const testHash = bcrypt.hashSync("testPassword", 10);
    console.log(bcrypt.compareSync("testPassword", testHash));
    const { email_negocio, password } = req.body;
    const negocioDB = await Negocio.findOne({ email_negocio });
    if (negocioDB) {
      if (negocioDB.check) {
        const passwordMatch = bcrypt.compareSync(password, negocioDB.password);

        if (passwordMatch) {
          const token = generateToken(negocioDB._id, email_negocio);
          return res.status(200).json({
            negocio: negocioDB,
            token,
          });
        } else {
          return res.status(401).json("La contraseña es incorrecta");
        }
      } else {
        return res
          .status(401)
          .json("El correo electrónico no ha sido validado");
      }
    } else {
      return res.status(401).json("Negocio no registrado");
    }
  } catch (error) {
    return res.status(500).json("Error al procesar la solicitud");
  }
};

//! -----------------------------------------------------------------------------
//? ----------------------------- SEND CODE -------------------------------------
//! -----------------------------------------------------------------------------
const sendCode = async (req, res, next) => {
  try {
    const { id } = req.params;
    const negocioDB = await Negocio.findById(id);

    const transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: EMAIL_USERNAME,
      to: negocioDB.email_negocio,
      subject: "Reserval Negocios - Código de confirmación",
      html: `
      <h2>Bienvenido(a), ${negocioDB.nombre}!</h2>
      <p>Gracias por registrarte en Reserval.</p>
      <p>Tu código de confirmación es: <strong>${negocioDB.confirmationCode}</strong></p>
      <p>Por favor, utiliza este código para confirmar tu cuenta.</p>
      <p>¡Esperamos que disfrutes de nuestros servicios!</p>
    `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(404).json({
          negocio: negocioDB,
          confirmationCode: "Error al enviar el código, vuelve a enviarlo",
        });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({
          negocio: negocioDB,
          confirmationCode: negocioDB.confirmationCode,
        });
      }
    });
  } catch (error) {
    return next(error);
  }
};
//! -----------------------------------------------------------------------------
//? ------------------------------RESEND CODE -----------------------------------
//! -----------------------------------------------------------------------------
const resendCode = async (req, res) => {
  try {
    const { email_negocio } = req.body;
    const negocioDB = await Negocio.findOne({ email_negocio });

    if (negocioDB.check) {
      return res.status(400).json("El negocio ya está verificado.");
    }
    const transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
    });

    const negocioExists = await Negocio.findOne({ email_negocio });

    if (negocioExists) {
      const newConfirmationCode = randomCode();

      const mailOptions = {
        from: EMAIL_USERNAME,
        to: negocioExists.email_negocio,
        subject: "Reenvío de código de confirmación",
        html: `
              <h2>Reenvío de código de confirmación</h2>
              <p>Tu nuevo código de confirmación es: <strong>${newConfirmationCode}</strong></p>
              <p>Por favor, utiliza este código para confirmar tu cuenta.</p>
            `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json("Error al enviar el correo electrónico");
        } else {
          console.log("Email sent: " + info.response);
          // Actualizar el código de confirmación en el usuario
          negocioExists.confirmationCode = newConfirmationCode;
          negocioExists.save();
          return res
            .status(200)
            .json("El código de verificación ha sido reenviado correctamente");
        }
      });
    } else {
      return res.status(404).json("Negocio no encontrado");
    }
  } catch (error) {
    return res.status(500).json("Error al procesar la solicitud");
  }
};

//! -----------------------------------------------------------------------------
//? ----------------------------- CHECKCODE --------------------------------------
//! -----------------------------------------------------------------------------
const checkCode = async (req, res) => {
  try {
    const { id } = req.params;
    const { confirmationCode } = req.body;

    const negocio = await Negocio.findById(id);

    if (!negocio) {
      return res.status(404).json("Negocio no encontrado");
    }

    if (confirmationCode === negocio.confirmationCode) {
      negocio.check = true;
      await negocio.save();

      return res.status(200).json({
        message:
          "Código de confirmación correcto. El negocio ha sido verificado.",
      });
    }

    return res.status(400).json("Código incorrecto");
  } catch (error) {
    return res.status(500).json("Error general al verificar el código");
  }
};
//! -----------------------------------------------------------------------------
//? ----------------------------- FORGOT PASSWORD -------------------------------
//! -----------------------------------------------------------------------------
const forgotPassword = async (req, res, next) => {
  try {
    const { email_negocio } = req.body;
    const negocioDb = await Negocio.findOne(email_negocio);

    if (!negocioDb) {
      return res.status(404).json("Negocio no registrado");
    }

    if (!negocioDb.check) {
      return res
        .status(401)
        .json("El negocio no ha validado el correo electrónico");
    }

    const newPassword = randomPassword();

    // Actualizar la contraseña del usuario en la base de datos
    negocioDb.password = newPassword;
    await negocioDb.save();

    // Enviar la nueva contraseña por correo
    const transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: EMAIL_USERNAME,
      to: negocioDb.email_negocio,
      subject: "Reserval Negocios - Cambio de contraseña",
      html: `
          <p>Hola ${negocioDb.nombre},</p>
          <p>Tu contraseña ha sido cambiada correctamente.</p>
          <p>Tu nueva contraseña es: <strong>${newPassword}</strong></p>
          <p>Por favor, por tu seguridad actualiza esta contraseña.</p>
          <p>Si no has solicitado el cambio de contraseña, por favor ponte en contacto con nosotros.</p>
          <p>Atentamente,</p>
          <p>Tu equipo de Reserval</p>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json(
            "No se pudo enviar el correo electrónico y no se actualizó la contraseña"
          );
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({
          message:
            "Se ha generado una nueva contraseña y se ha enviado por correo electrónico",
        });
      }
    });
  } catch (error) {
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? ----------------------------MODIFY PASSWORD -----------------------------------
//! -----------------------------------------------------------------------------
const modifyPassword = async (req, res, next) => {
  try {
    const { password, newPassword } = req.body;
    const { _id } = req.user;

    if (!password || !newPassword) {
      return res
        .status(400)
        .json(
          "Por favor, proporciona la contraseña actual y la nueva contraseña"
        );
    }

    const negocio = await Negocio.findById(_id);

    if (!negocio) {
      return res.status(404).json("Negocio no encontrado");
    }

    if (!bcrypt.compareSync(password, negocio.password)) {
      return res.status(400).json("La contraseña actual no es válida");
    }

    const newPasswordHashed = bcrypt.hashSync(newPassword, 10);

    await Negocio.findByIdAndUpdate(
      _id,
      { password: newPasswordHashed },
      { new: true }
    );

    return res.status(200).json("Contraseña modificada exitosamente");
  } catch (error) {
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? ----------------------------UPDATE NEGOCIO-----------------------------------
//! -----------------------------------------------------------------------------
const updateNegocio = async (req, res) => {
  try {
    const updates = Object.keys(req.body).reduce((result, key) => {
      if (req.body[key] !== undefined || req.body[key] !== null) {
        result[key] = req.body[key];
      }
      return result;
    }, {});

    const updatedNegocio = await Negocio.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!updatedNegocio) {
      return res.status(404).json({ message: "Negocio no encontrado." });
    }

    res.json(updatedNegocio);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//! -----------------------------------------------------------------------------
//? ----------------------------DELETE NEGOCIO-----------------------------------
//! -----------------------------------------------------------------------------
const deleteNegocio = async (req, res) => {
  try {
    const negocio = await Negocio.findById(req.params.id);
    if (!negocio) {
      return res.status(404).json({ message: "Negocio no encontrado" });
    }

    // Asegurarse de que el negocio que realiza la solicitud es el que se va a eliminar
    if (req.user && req.user.id === req.params.id) {
      await Negocio.findByIdAndDelete(req.params.id);
      res.json({ message: "Negocio eliminado" });
    } else {
      res.status(403).json({ message: "No autorizado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! -----------------------------------------------------------------------------
//? ----------------------------GET NEGOCIO--------------------------------------
//! -----------------------------------------------------------------------------
const getNegocio = async (req, res) => {
  try {
    const negocio = await Negocio.findById(req.params.id);
    if (negocio == null) {
      return res.status(404).json({ message: "Negocio no encontrado" });
    }
    res.json(negocio);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//! -----------------------------------------------------------------------------
//? ----------------------------GET NEGOCIOS BY CATEGORY-------------------------
//! -----------------------------------------------------------------------------
const getNegociosByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const negocios = await Negocio.find({ category: category });
    if (negocios.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron negocios con esa categoría." });
    }
    res.status(200).json(negocios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! -----------------------------------------------------------------------------
//? ----------------------------GET SERVICIOS BY NEGOCIO-------------------------
//! -----------------------------------------------------------------------------
const getServicesByNegocio = async (req, res) => {
  try {
    const servicios = await Servicio.find({ category: req.params.category });
    res.status(200).json(servicios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//! -----------------------------------------------------------------------------
//? ----------------------------GET RESERVAS BY NEGOCIO-------------------------
//! -----------------------------------------------------------------------------
const getReservasByNegocio = async (req, res) => {
  try {
    const reservas = await Reserva.find({ negocio: req.params.id }).populate(
      "usuario servicio"
    );
    res.status(200).json(reservas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  register,
  resendCode,
  sendCode,
  login,
  forgotPassword,
  modifyPassword,
  updateNegocio,
  deleteNegocio,
  checkCode,
  getNegocio,
  getNegociosByCategory,
  getServicesByNegocio,
  getReservasByNegocio,
};
