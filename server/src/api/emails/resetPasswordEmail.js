const nodemailer = require("nodemailer");
const EMAIL_USERNAME = process.env.EMAIL_USERNAME;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_SERVICE = process.env.EMAIL_SERVICE;

const createEmailTransporter = () => {
  return nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    },
  });
};

const createEmailOptions = (userDB, resetPasswordUrl) => {
  return {
    from: EMAIL_USERNAME,
    to: userDB.email,
    subject: "Reserval - Solicitud de cambio de contraseña",
    html: `
      <h2>Hola ${userDB.name},</h2>
      <p>Hemos recibido una solicitud para cambiar tu contraseña en Reserval.</p>
      <p>Si tú no has hecho esta solicitud, por favor ignora este correo electrónico.</p>
      <p>Para cambiar tu contraseña, por favor sigue el enlace a continuación:</p>
      <p><a href="${resetPasswordUrl}">Cambia tu contraseña</a></p>
      <p>Este enlace expirará en una hora.</p>
      <p>¡Esperamos que disfrutes de nuestros servicios!</p>
    `,
  };
};

const resetPasswordEmail = async (userDB, resetPasswordUrl) => {
  const transporter = createEmailTransporter();
  const mailOptions = createEmailOptions(userDB, resetPasswordUrl);

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

module.exports = {
  resetPasswordEmail,
};
