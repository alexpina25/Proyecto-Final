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

const createEmailOptions = (userDB, newConfirmationCode, encodedToken) => {
  return {
    from: EMAIL_USERNAME,
    to: userDB.email,
    subject: "Confirmación de Reenvío de Código",
    html: `
      <h2>Confirmación de Reenvío de Código</h2>
      <p>¡Hola! Has solicitado un nuevo código de confirmación para tu cuenta. Asegúrate de copiar el siguiente código:</p>
      <p><strong>${newConfirmationCode}</strong></p>
      <p>Después, haz clic en el siguiente enlace para confirmar tu cuenta:</p>
      <p><a href="http://localhost:5173/check-code?token=${encodedToken}" target="_blank">Confirmar mi cuenta</a></p>
      <p>Si no has solicitado este cambio, por favor, ignora este correo electrónico. Tu cuenta seguirá segura.</p>
      <p>¡Esperamos que disfrutes de nuestros servicios!</p>
      <p>Gracias por tu atención.</p>
    `,
  };
};

const sendResendCodeEmail = async (
  userDB,
  newConfirmationCode,
  encodedToken
) => {
  const transporter = createEmailTransporter();
  const mailOptions = createEmailOptions(
    userDB,
    newConfirmationCode,
    encodedToken
  );

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
  sendResendCodeEmail,
};
