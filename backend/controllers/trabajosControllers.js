const connection = require("../database");

const obtenerTrabajos = (req, res) => {
  connection.query("SELECT * FROM trabajo", (error, results) => {
    if (error) {
      console.error("Error al obtener trabajos", error);
      res.status(500).json({
        error: "Error al obtener trabajos",
      });
    } else {
      res.json(results);
    }
  });
};

const obtenerTrabajoPorId = (req, res) => {
  const id = req.params.id_trabajo;
  connection.query("SELECT * FROM trabajo WHERE id_trabajo =?", [id], (error, results) => {
    if (error) {
      res.status(500).json({error: "Ocurrió un error al obtener el trabajo"});
    } else if(results.length === 0){
      res.status(404).json({error:"El trabajo no fue encontrado"});
    } else {
      res.json(results[0]);
    }
  });
};

const crearTrabajo = (req, res) => {
  const { titulo, descripcion, fecha_inicio, fecha_fin, id_usuario} = req.body;

  // Verificar que se proporcionen todos los campos necesarios
  if (!titulo || !descripcion || !fecha_inicio || !fecha_fin || !id_usuario) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  // Insertar el nuevo trabajo en la base de datos
  connection.query(
    'INSERT INTO trabajo (titulo, descripcion, fecha_inicio, fecha_fin, id_usuario) VALUES (?,?,?,?,?)',
    [titulo, descripcion, fecha_inicio, fecha_fin, id_usuario],
    (error, results) => {
      if (error) {
        console.error('Error al agregar trabajo', error);
        return res.status(500).json({ error: 'Error al agregar trabajo' });
      }

      res.json({ message: 'Trabajo agregado correctamente' });
    }
  );
};

const actualizarTrabajoPorId = (req, res) => {
  const id = req.params.id_trabajo;
  const { titulo, descripcion, fecha_inicio, fecha_fin, id_usuario } = req.body;
  connection.query(
    "UPDATE trabajo SET titulo=?, descripcion=?, fecha_inicio=?, fecha_fin=?, id_usuario=? WHERE id_trabajo=?",
    [titulo, descripcion, fecha_inicio, fecha_fin, id_usuario, id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar trabajo", error);
        res.status(500).json({error: "Error al actualizar trabajo"});
      } else {
        res.json({message: "Trabajo actualizado correctamente"});
      }
    }
  );
};

const eliminarTrabajoPorId = (req, res) => {
  const id = req.params.id_trabajo;
  connection.query("DELETE FROM trabajo WHERE id_trabajo=?", [id], (error, results) => {
    if (error) {
      res.status(500).json({error: "Ocurrió un error al eliminar el trabajo"});
    } else {
      res.json({message: "Trabajo eliminado correctamente"});
    }
  });
};


const obtenerTrabajosTabla = (req, res) => {
    connection.query("SELECT tipo_trabajo.nombre_tipo_trabajo, trabajo.descripcion FROM trabajo INNER JOIN tipo_trabajo ON trabajo.tipo_trabajo_id = tipo_trabajo.id_tipo_trabajo", (error, results) => {
      if (error) {
        console.error("Error al obtener trabajos", error);
        res.status(500).json({
          error: "Error al obtener trabajos",
        });
      } else {
        res.json(results);
      }
    });
  };

module.exports = {
  obtenerTrabajos,
  obtenerTrabajoPorId,
  crearTrabajo,
  actualizarTrabajoPorId,
  eliminarTrabajoPorId,
  obtenerTrabajosTabla
};
