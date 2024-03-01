const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { sendRegistrationEmail } = require("../emails/registerEmail");
const { sendResendCodeEmail } = require("../emails/resendCodeEmail");
const { resetPasswordEmail } = require("../emails/resetPasswordEmail");
const randomCode = require("../../utils/randomCode");
const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const {
  generateToken,
  generateTokenFull,
  verifyToken,
} = require("../../utils/token");
const { customUserData } = require("../../utils/user.utils");

dotenv.config();

const DEFAULT_IMAGE_URL = "https://pic.onlinewebfonts.com/svg/img_181369.png";
/* -------------------------------------------------------------------------- */
/*                                  REGISTER                                  */
/* -------------------------------------------------------------------------- */
const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (req.file) {
        deleteImgCloudinary(req.file.path);
      }
      return res.status(409).json("Este correo electronico ya esta en uso");
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
        try {
          const token = generateToken(savedUser._id, savedUser.email);
          res.cookie("user", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
          });

          await sendRegistrationEmail(savedUser, confirmationCode, token);

          res.status(200).json({
            _id: savedUser._id,
            confirmationCode: savedUser.confirmationCode,
          });
        } catch (error) {
          res.status(500).json({
            message: "Error al enviar el correo de confirmación",
          });
        }
      }
    } catch (error) {
      if (req.file) {
        deleteImgCloudinary(req.file.path);
      }
      return res.status(400).json(error.message);
    }
  } catch (error) {
    return next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                                    LOGIN                                   */
/* -------------------------------------------------------------------------- */
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDB = await User.findOne({ email });

    if (!userDB || !(await bcrypt.compare(password, userDB.password))) {
      return res
        .status(401)
        .json({ message: "Email o contraseña incorrectas" });
    }
    if (!userDB.check) {
      return res.status(401).json({
        message: "El correo electrónico no ha sido validado",
        _id: userDB._id,
      });
    }

    const userData = customUserData(userDB);
    const token = generateTokenFull(userData);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });
    return res.status(200).json(userData);
  } catch (error) {
    return res.status(500).json({
      message: "Error al procesar la solicitud",
      error: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                                 RESEND CODE                                */
/* -------------------------------------------------------------------------- */
const resendCode = async (req, res) => {
  try {
    const { token, email } = req.body;
    let userEmail;
    if (token) {
      userEmail = jwt.verify(token, process.env.JWT_SECRET).email;
    } else if (email) {
      userEmail = email;
    } else {
      return res.status(400).json("Se requiere un token o un email.");
    }

    const user = await User.findOne({ email: userEmail });

    if (user.check) {
      return res.status(400).json("El usuario ya está verificado.");
    }

    if (user) {
      const payload = {
        id: user._id,
        email: user.email,
      };

      let encodedToken;
      try {
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });
        encodedToken = encodeURIComponent(token);
      } catch (error) {
        console.error("Error al crear el token:", error);
        return res.status(500).json("Error al crear el token de verificación.");
      }

      const newConfirmationCode = randomCode();
      const info = await sendResendCodeEmail(
        user,
        newConfirmationCode,
        encodedToken
      );

      if (info) {
        user.confirmationCode = newConfirmationCode;
        await user.save();
        return res.status(200).json({
          message: "El código de verificación ha sido reenviado correctamente",
          _id: user._id,
          codeConfirmation: user.confirmationCode,
        });
      }
      return res.status(500).json("Error al enviar el correo electrónico");
    } else {
      return res.status(404).json("Usuario no encontrado");
    }
  } catch (error) {
    return res.status(500).json("Error al procesar la solicitud");
  }
};

/* -------------------------------------------------------------------------- */
/*                                 CHECK CODE                                 */
/* -------------------------------------------------------------------------- */
const checkCode = async (req, res) => {
  try {
    const token = req.params.token;

    if (!token) {
      return res.status(401).json("No autenticado");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json("Usuario no encontrado");
    }

    const { code } = req.body;
    if (user.confirmationCode === code) {
      user.check = true;
      await user.save();
      return res.status(200).json("Usuario verificado con éxito");
    } else {
      return res.status(400).json("Código incorrecto");
    }
  } catch (error) {
    console.error("Error al verificar el código:", error);
    return res.status(500).json("Error al procesar la solicitud");
  }
};

/* -------------------------------------------------------------------------- */
/*                           REQUEST PASSWORD RESET                           */
/* -------------------------------------------------------------------------- */
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "No hay un usuario con ese email" });
  }

  const secret = user.password + "-" + user.createdAt.getTime();
  const token = jwt.sign({ _id: user._idid }, secret, { expiresIn: 3600 }); // 1 hour
  const encodedToken = encodeURIComponent(token);

  const resetPasswordUrl = `http://localhost:3001/reset-password?token=${encodedToken}`;

  await resetPasswordEmail(user, resetPasswordUrl);

  res.status(200).json({
    message: "Email de recuperación de contraseña enviado",
    token: token,
  });
};

/* -------------------------------------------------------------------------- */
/*                               RESET PASSWORD                               */
/* -------------------------------------------------------------------------- */
const resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const { token } = req.query;
  const { _id, iat } = jwt.decode(token);

  const user = await User.findOne({ _id: _id });

  if (!user) {
    return res.status(404).json({ message: "Usuario no válido" });
  }

  if (user.lastPasswordReset && iat < user.lastPasswordReset.getTime() / 1000) {
    return res
      .status(403)
      .json({ message: "El cambio de contraseña ya ha sido utilizado" });
  }

  user.password = newPassword;
  user.lastPasswordReset = Date.now();
  await user.save();

  res.status(200).json({ message: "Contraseña actualizada correctamente" });
};

/* -------------------------------------------------------------------------- */
/*                               VERIFY PASSWORD                              */
/* -------------------------------------------------------------------------- */
const verifyPassword = async (req, res) => {
  const { password } = req.body;
  const user = req.user;

  if (!user) {
    return res.status(404).json({ message: "Usuario no válido" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Contraseña incorrecta" });
  }

  res.status(200).json({ message: "Contraseña verificada" });
};

/* -------------------------------------------------------------------------- */
/*                               CANGE PASSWORD                               */
/* -------------------------------------------------------------------------- */
const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = req.user;

  if (!user) {
    return res.status(404).json({ message: "Usuario no válido" });
  }

  if (!(await bcrypt.compare(oldPassword, user.password))) {
    return res.status(401).json({ message: "Contraseña antigua incorrecta" });
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({ message: "Contraseña actualizada correctamente" });
};

/* -------------------------------------------------------------------------- */
/*                                 UPDATE USER                                */
/* -------------------------------------------------------------------------- */
const update = async (req, res, next) => {
  try {
    const updateData = {};
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (req.body.name) {
      updateData.name = req.body.name;
    }

    if (req.body.email) {
      // Aquí puedes agregar validación de correo electrónico si es necesario
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
        return res
          .status(400)
          .json({ message: "Correo electrónico no válido" });
      }
      updateData.email = req.body.email;
    }
    if (req.body.telefono) {
      // Validar el número de teléfono
      if (!/^\d{9}$/.test(req.body.telefono)) {
        return res
          .status(400)
          .json({ message: "Número de teléfono no válido" });
      }
      updateData.telefono = req.body.telefono;
    }

    if (req.file) {
      updateData.image = req.file.path;
    }

    Object.assign(user, updateData);

    await user.save();
    const customUser = customUserData(user);

    const token = jwt.sign(customUser, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });

    return res.status(200).json({
      message: "Usuario actualizado correctamente",
      user,
    });
  } catch (error) {
    if (req.file) {
      deleteImgCloudinary(req.file.path);
    }
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                             GET USER WITH TOKEN                            */
/* -------------------------------------------------------------------------- */
const getUser = async (req, res) => {
  try {
    const token = req.cookies.user || req.cookies.token;

    if (!token) {
      return res.status(401).send("No se proporcionó ningún token");
    }

    const decodedToken = verifyToken(token);
    const customUser = customUserData(decodedToken);
    res.status(200).json(customUser);
  } catch (error) {
    res.status(401).send("Token inválido");
  }
};

/* -------------------------------------------------------------------------- */
/*                                 DELETE USER                                */
/* -------------------------------------------------------------------------- */
const deleteUser = async (req, res) => {
  // Asumiendo que el middleware de isAuth añade el usuario a req.user
  const user = req.user;

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  try {
    await User.deleteOne({ _id: req.user._id });
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (err) {
    res.status(500).json({ message: "Hubo un error al eliminar al usuario" });
  }
};

/* -------------------------------------------------------------------------- */
/*                                   LOGOUT                                   */
/* -------------------------------------------------------------------------- */

const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Sesión cerrada correctamente" });
};
module.exports = {
  register,
  resendCode,
  login,
  requestPasswordReset,
  resetPassword,
  verifyPassword,
  changePassword,
  update,
  deleteUser,
  checkCode,
  getUser,
  logout,
};
