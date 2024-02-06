const nodemailer = require('nodemailer');

// Configuración del servicio de correo electrónico (utilizando Gmail en este ejemplo)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'TsakinContacto@gmail.com',
    pass: 'ufnj epvz ixnh ruzf',
  },
});

// Función para enviar un correo electrónico
const enviarCorreo = async (destinatario, asunto, cuerpo) => {
  try {
    const info = await transporter.sendMail({
      from: 'TsakinContacto@gmail.com',
      to: destinatario,
      subject: asunto,
      text: cuerpo,
    });

    console.log('Correo electrónico enviado:', info.response);
    return true; // Éxito al enviar el correo
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    return false; // Error al enviar el correo
  }
};

module.exports = {
  enviarCorreo
};
