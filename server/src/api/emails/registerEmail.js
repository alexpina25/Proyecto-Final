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

const createEmailOptions = (userDB, confirmationCode) => {
  return {
    from: EMAIL_USERNAME,
    to: userDB.email,
    subject: "Reserval - Código de confirmación",
    html: `
      <h2>Bienvenido(a), ${userDB.name}!</h2>
      <p>Gracias por registrarte en Reserval.</p>
      <p>Tu código de confirmación es: <strong>${confirmationCode}</strong></p>
      <p>Por favor, utiliza este código para confirmar tu cuenta.</p>
      <p>Además, puedes hacer clic en el siguiente enlace para confirmar tu cuenta:</p>
      <p><a href="http://localhost:5173/check-code/${userDB._id}" target="_blank">Confirmar mi cuenta</a></p>
      <p>¡Esperamos que disfrutes de nuestros servicios!</p>
    `,
  };
};

const sendRegistrationEmail = async (userDB, confirmationCode) => {
  const transporter = createEmailTransporter();
  const mailOptions = createEmailOptions(userDB, confirmationCode);

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
  sendRegistrationEmail,
};
