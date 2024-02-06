// Importa el objeto de conexión que ahora utiliza la interfaz de promesas
const connection = require("../database");

const login = (req, res) => {
    console.log('Cuerpo de la petición:', req.body);
  const { nombre_usuario = "", contrasenia = "" } = req.body;

  const query = "SELECT * FROM usuario WHERE nombre_usuario = ? AND contrasenia = ?";

  connection.query(query, [nombre_usuario, contrasenia], (error, results) => {
    if (error) {
      console.error('Error en el inicio de sesión', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    if (!Array.isArray(results) || results.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Asegúrate de que results[0] sea un objeto antes de desestructurarlo
    const usuario = results[0] || {};

    
  
      res.json({
        message: 'Inicio de sesión exitoso',
        usuario: {
          id_usuario: usuario.id_usuario,
          nombre_usuario: usuario.nombre_usuario,
          rol_id: usuario.rol_id,
        },
        rol: usuario.rol_id
      });
    });
  };
  

module.exports = {
  login
};
