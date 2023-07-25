const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const randomCode = require("../../utils/randomCode");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/user.model");
const nodemailer = require("nodemailer");
const { generateToken } = require("../../utils/token");
const randomPassword = require("../../utils/randomPassword");

const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;
const BASE_URL_COMPLETE = `${BASE_URL}${PORT}`;

const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_SERVICE = process.env.EMAIL_SERVICE;

const DEFAULT_IMAGE_URL = "https://pic.onlinewebfonts.com/svg/img_181369.png";

//! -----------------------------------------------------------------------------
//? ----------------------------REGISTER-----------------------------------------
//! -----------------------------------------------------------------------------
const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (req.file) {
        deleteImgCloudinary(req.file.path);
      }
      return res.status(409).json("Este usuario ya existe");
    }

    const confirmationCode = randomCode();
    const user = new User({ ...req.body, confirmationCode });

    if (req.file) {
      user.image = req.file.path;
    } else {
      user.image = DEFAULT_IMAGE_URL;
    }

    try {
      const savedUser = await user.save();
      if (savedUser) {
        return res.redirect(
          `${BASE_URL_COMPLETE}/api/v1/users/register/sendCode/${savedUser._id}`
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
//? ------------------CONTRALADORES QUE PUEDEN SER REDIRECT ---------------------
//! -----------------------------------------------------------------------------

//!!! esto quiere decir que o bien tienen entidad propia porque se llaman por si mismos por parte del cliente
//! o bien son llamados por redirect es decir son controladores de funciones accesorias

//! -----------------------------------------------------------------------------
//? ----------------------------- SEND CODE -------------------------------------
//! -----------------------------------------------------------------------------
const sendCode = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDB = await User.findById(id);

    const transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: EMAIL_USERNAME,
      to: userDB.email,
      subject: "Reserval - Código de confirmación",
      html: `
    <h2>Bienvenido(a), ${userDB.name}!</h2>
    <p>Gracias por registrarte en Reserval.</p>
    <p>Tu código de confirmación es: <strong>${userDB.confirmationCode}</strong></p>
    <p>Por favor, utiliza este código para confirmar tu cuenta.</p>
    <p>¡Esperamos que disfrutes de nuestros servicios!</p>
  `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(404).json({
          user: userDB,
          confirmationCode: "Error al enviar el código, vuelve a enviarlo",
        });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({
          user: userDB,
          confirmationCode: userDB.confirmationCode,
        });
      }
    });
  } catch (error) {
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? --------------------------------LOGIN ---------------------------------------
//! -----------------------------------------------------------------------------
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDB = await User.findOne({ email });
    if (userDB) {
      if (userDB.check) {
        const passwordMatch = bcrypt.compareSync(password, userDB.password);

        if (passwordMatch) {
          const token = generateToken(userDB._id, email);
          return res.status(200).json({
            user: userDB,
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
      return res.status(401).json("Usuario no registrado");
    }
  } catch (error) {
    return res.status(500).json("Error al procesar la solicitud");
  }
};

//! -----------------------------------------------------------------------------
//? -----------------------RESEND CODE -----------------------------
//! -----------------------------------------------------------------------------
const resendCode = async (req, res) => {
  try {
    const { email } = req.body;
    const userDB = await User.findOne({ email });

    if (userDB.check) {
      return res.status(400).json("El usuario ya está verificado.");
    }
    const transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
    });

    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      const newConfirmationCode = randomCode();

      const mailOptions = {
        from: EMAIL_USERNAME,
        to: userExists.email,
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
          userExists.confirmationCode = newConfirmationCode;
          userExists.save();
          return res
            .status(200)
            .json("El código de verificación ha sido reenviado correctamente");
        }
      });
    } else {
      return res.status(404).json("Usuario no encontrado");
    }
  } catch (error) {
    return res.status(500).json("Error al procesar la solicitud");
  }
};

//! ------------------------------------------------------------------------
//? -------------------------- CHECKCODE------------------------------
//! ------------------------------------------------------------------------

const checkCode = async (req, res) => {
  try {
    const { id } = req.params;
    const { confirmationCode } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json("Usuario no encontrado");
    }

    if (confirmationCode === user.confirmationCode) {
      user.check = true;
      await user.save();

      return res.status(200).json({
        message:
          "Código de confirmación correcto. El usuario ha sido verificado.",
      });
    }

    return res.status(400).json("Código incorrecto");
  } catch (error) {
    return res.status(500).json("Error general al verificar el código");
  }
};

//! -----------------------------------------------------------------------------
//? -----------------------CONTRASEÑAS Y SUS CAMBIOS-----------------------------
//! -----------------------------------------------------------------------------

//? -----------------------------------------------------------------------------
//! ------------------CAMBIO DE CONTRASEÑA CUANDO NO ESTAS LOGADO---------------
//? -----------------------------------------------------------------------------
const changePassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userDb = await User.findOne(email);

    if (!userDb) {
      return res.status(404).json("Usuario no registrado");
    }

    if (!userDb.check) {
      return res
        .status(401)
        .json("El usuario no ha validado el correo electrónico");
    }

    // Actualizar la contraseña del usuario en la base de datos
    const newPassword = randomPassword();
    userDb.password = newPassword;
    await userDb.save();

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
      to: userDb.email,
      subject: "Cambio de contraseña",
      html: `
        <p>Hola ${userDb.name},</p>
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

//? -----------------------------------------------------------------------------
//! ------------------CAMBIO DE CONTRASEÑA CUANDO YA SE ESTA ESTA LOGADO---------------
//? -----------------------------------------------------------------------------
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

    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json("Usuario no encontrado");
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json("La contraseña actual no es válida");
    }

    const newPasswordHashed = bcrypt.hashSync(newPassword, 10);

    await User.findByIdAndUpdate(
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
//? ---------------------------------UPDATE--------------------------------------
//! -----------------------------------------------------------------------------

const update = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await User.syncIndexes();
    const patchUser = new User(req.body);
    if (req.file) {
      patchUser.image = req.file.path;
    }

    patchUser._id = req.user._id;
    patchUser.password = req.user.password;
    patchUser.rol = req.user.rol;
    patchUser.confirmationCode = req.user.confirmationCode;
    patchUser.check = req.user.check;
    patchUser.email = req.user.email;

    try {
      // Validar el número de teléfono utilizando la regla definida en el modelo
      if (!/^\d{9}$/.test(patchUser.telefono)) {
        return res.status(400).json("Número de teléfono no válido");
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        patchUser,
        {
          new: true, // Return the updated user after the update
        }
      );

      if (!updatedUser) {
        // User not updated
        if (req.file) {
          deleteImgCloudinary(req.user.image);
        }
        return res.status(404).json("El usuario no se ha actualizado");
      }

      const updateKeys = Object.keys(req.body);
      const testUpdate = [];

      updateKeys.forEach((item) => {
        if (updatedUser[item] == req.body[item]) {
          testUpdate.push({
            [item]: req.body[item],
          });
        } else {
          testUpdate.push({
            [item]: false,
          });
        }
      });

      if (req.file) {
        updatedUser.image == req.file.path
          ? testUpdate.push({
              file: true,
            })
          : testUpdate.push({
              file: false,
            });
      }

      return res.status(200).json({
        message: "Usuario actualizado correctamente",
        updateUser: testUpdate,
      });
    } catch (error) {
      return res.status(404).json(error.message);
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(catchImg);
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? ----------------------------- DELETE ----------------------------------------
//! -----------------------------------------------------------------------------
const deleteUser = async (req, res, next) => {
  try {
    const { _id, image } = req.user;
    const deletedUser = await User.findByIdAndDelete(_id);

    if (deletedUser) {
      deleteImgCloudinary(image);
      return res.status(200).json("Usuario eliminado correctamente");
    } else {
      return res.status(404).json("No se pudo eliminar el usuario");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  resendCode,
  sendCode,
  login,
  changePassword,
  modifyPassword,
  update,
  deleteUser,
  checkCode,
};
