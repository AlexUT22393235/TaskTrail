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
  const { nombre_usuario, contrasenia, rol_id} = req.body;

  // Verificar que se proporcionen nombre, correo y contraseña
  if (!nombre_usuario || !contrasenia || !rol_id) {
    return res.status(400).json({ error: 'Nombre, correo o contraseña faltante' });
  }

  // Almacenar el nombre de usuario, correo y contraseña en la base de datos sin encriptación
  connection.query(
    'INSERT INTO usuario (nombre_usuario, contrasenia, rol_id) VALUES (?,?,?)',
    [nombre_usuario,contrasenia, rol_id],
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






module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuarioPorId,
  eliminarUsuarioPorId,
  login,
};
