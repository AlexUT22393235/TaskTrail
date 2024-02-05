const connection = require("../database");

const obtenerUsuarios = (req, res) => {
  connection.query("SELECT * FROM usuario", (error, results) => {
    if (error) {
      console.error("Error al obtener usuarios", error);
      res.status(500).json({
        error: "Error al obtener usuarios",
      });
    } else {
      res.json(results);
    }
  });
};

const obtenerUsuarioPorId = (req, res) => {
  const id = req.params.id_usuario;
  connection.query("SELECT * FROM usuario WHERE id_usuario =?", [id], (error, results) => {
    if (error) {
      res.status(500).json({error: "Ocurrió un error al obtener el usuario"});
    } else if(results.length === 0){
      res.status(500).json({error:"El usuario no fue encontrado"});
    } else {
      res.json(results[0]);
    }
  });
};


const crearUsuario = (req, res) => {
  const { nombre, contrasenia, rol} = req.body;

  // Verificar que se proporcionen nombre, correo y contraseña
  if (!nombre || !contrasenia || !rol) {
    return res.status(400).json({ error: 'Nombre, correo o contraseña faltante' });
  }

  // Almacenar el nombre de usuario, correo y contraseña en la base de datos sin encriptación
  connection.query(
    'INSERT INTO usuario (nombre_usuario, contrasenia, rol_id) VALUES (?,?,?)',
    [nombre,contrasenia, rol],
    (error, results) => {
      if (error) {
        console.error('Error al agregar usuario', error);
        return res.status(500).json({ error: 'Error al agregar usuario' });
      }

      res.json({ message: 'Usuario agregado correctamente' });
    }
  );
};


const actualizarUsuarioPorId = (req, res) => {
  const id = req.params.id_usuario;
  const { nombre, contrasenia, rol } = req.body;
  connection.query(
    "UPDATE usuario SET nombre_usuario=?, contrasenia=?, rol_id=? WHERE id_usuario=?",
    [nombre,contrasenia, rol, id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar usuario", error);
        res.status(500).json({error: "Error al actualizar usuario"});
      } else {
        res.json({message: "Usuario actualizado correctamente"});
      }
    }
  );
};

const eliminarUsuarioPorId = (req, res) => {
  const id = req.params.id_usuario;
  connection.query("DELETE FROM usuario WHERE id_usuario=?", [id], (error, results) => {
    if (error) {
      res.status(500).json({error: "Ocurrió un error al eliminar el usuario"});
    } else {
      res.json({message: "Usuario eliminado correctamente"});
    }
  });
};



const login = (req, res) => {
  const { nombre, contrasenia } = req.body;
  const sql = 'SELECT id_usuario, rol_id FROM usuario WHERE nombre_usuario = ? AND contrasenia = ?';

  connection.query(sql, [nombre, contrasenia], (error, results) => {
    if (error) {
      console.error(error);
      return res.json({ error: 'Error en la consulta' });
    }

    if (results.length === 1) {
      const idUsuario = results[0].id_usuario;
      const rolId = results[0].rol_id;

      if (rolId === 1) {
        return res.json({ mensaje: 'Autenticación exitosa como administrador', idUsuario, rol: 'admin' });
      } else if (rolId === 2) {
        return res.json({ mensaje: 'Autenticación exitosa como mecanico', idUsuario, rol: 'mecanico' });
      } else {
        return res.status(401).json({ error: 'Rol no reconocido' });
      }
    } else {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  });
};


const nodemailer = require('nodemailer');
const nanoid = require('nanoid');

// ... (otras importaciones y código)

const generarCodigoVerificacion = () => {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const codigoVerificacion = nanoid.customAlphabet(alphabet, 3)();
  return codigoVerificacion;
};


const enviarCorreoVerificacion = async (email, codigoVerificacion) => {
  // Configuración de nodemailer (ajústala según tu proveedor de correo)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tony13.aekc@gmail.com',
      pass: 'tu_contraseña',
    },
  });

  // Contenido del correo electrónico
  const mailOptions = {
    from: 'tu_correo@gmail.com',
    to: email,
    subject: 'Código de Verificación',
    text: `Tu código de verificación es: ${codigoVerificacion}`,
  };

  // Envío del correo electrónico
  await transporter.sendMail(mailOptions);
};

const generarYEnviarCodigo = async (req, res) => {
  const { nombre, contrasenia, email } = req.body;

  // Generar código de verificación
  const codigoVerificacion = generarCodigoVerificacion();

  // Enviar código por correo electrónico
  await enviarCorreoVerificacion(email, codigoVerificacion);

  // Actualizar la base de datos con el código de verificación
  connection.query(
    'UPDATE usuario SET codigo_verificacion = ? WHERE nombre_usuario = ?',
    [codigoVerificacion, nombre],
    (error, results) => {
      if (error) {
        console.error('Error al actualizar código de verificación en la base de datos', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        res.json({ message: 'Código de verificación enviado exitosamente' });
      }
    }
  );
};

const verificarCodigo = (req, res) => {
  const { nombre, codigoVerificacion } = req.body;

  // Verificar el código ingresado con el almacenado en la base de datos
  connection.query(
    'SELECT * FROM usuario WHERE nombre_usuario = ? AND codigo_verificacion = ?',
    [nombre, codigoVerificacion],
    (error, results) => {
      if (error) {
        console.error('Error al verificar código de verificación en la base de datos', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else if (results.length === 1) {
        res.json({ message: 'Código de verificación correcto. Redirigiendo a la página de trabajos' });
        // Aquí puedes redirigir al usuario a la página de trabajos
      } else {
        res.status(401).json({ error: 'Código de verificación incorrecto' });
      }
    }
  );
};



module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuarioPorId,
  eliminarUsuarioPorId,
  login,
  generarYEnviarCodigo,
  verificarCodigo,
};
