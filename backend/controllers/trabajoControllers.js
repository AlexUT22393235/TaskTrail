const connection = require("../database");

const obtenerTrabajo = (req, res) => {
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
    console.log('Entrando en el controlador obtenerTrabajoPorId');
    
    const id = req.params.id_trabajo;
    console.log('ID del trabajo:', id);
  
    connection.query("SELECT * FROM trabajo WHERE id_trabajo =?", [id], (error, results) => {
      if (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({error: "Ocurrió un error al obtener el trabajo"});
      } else if(results.length === 0){
        console.log('Trabajo no encontrado');
        res.status(404).json({error:"El trabajo no fue encontrado"});
      } else {
        console.log('Trabajo encontrado:', results[0]);
        res.json(results[0]);
      }
    });
  };

const obtenerTrabajoPorUsuario = (req, res) => {
    const usuarioId = req.body.id_usuario; // Asegúrate de tener acceso al ID del usuario en el cuerpo
    connection.query("SELECT * FROM trabajo WHERE usuario_id = ?", [usuarioId], (error, results) => {
        if (error) {
            console.error("Error al obtener trabajos por usuario", error);
            res.status(500).json({
                error: "Error al obtener trabajos por usuario",
            });
        } else {
            res.json(results);
        }
    });
};


const crearTrabajo = (req, res) => {
    const { descripcion, horas_trabajo, tipo_trabajo_id, tarifa_trabajo_id, usuario_id } = req.body;

    connection.beginTransaction((err) => {
        if (err) {
            console.error("Error al iniciar la transacción", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        }

        // Paso 1: Insertar en la tabla principal (trabajo)
        connection.query(
            "INSERT INTO trabajo (descripcion, horas_trabajo, tipo_trabajo_id, tarifa_trabajo_id, usuario_id) VALUES (?, ?, ?, ?, ?)",
            [descripcion, horas_trabajo, tipo_trabajo_id, tarifa_trabajo_id, usuario_id],
            (error, results) => {
                if (error) {
                    connection.rollback(() => {
                        console.error("Error al insertar en la tabla trabajo", error);
                        res.status(500).json({ error: "Error al insertar trabajo" });
                    });
                } else {
                    const trabajoId = results.insertId;

                    // Paso 2: Commit de la transacción
                    connection.commit((err) => {
                        if (err) {
                            connection.rollback(() => {
                                console.error("Error al realizar commit de la transacción", err);
                                res.status(500).json({ error: "Error interno del servidor" });
                            });
                        } else {
                            res.json({ id: trabajoId, message: "Trabajo creado exitosamente" });
                        }
                    });
                }
            }
        );
    });
};

const eliminarTrabajo = (req, res) => {
    const id = req.params.id_usuario;
    connection.query("DELETE FROM trabajo WHERE id_trabajo=?", [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: "Ocurrió un error al eliminar este trabajo" });
        } else {
            res.json({ message: "Trabajo eliminado correctamente" });
        }
    });
};

const obtenerUltimoIDTrabajoPorUsuario = (req, res) => {
    const usuarioId = req.body.id_usuario; // Asegúrate de tener acceso al ID del usuario en el cuerpo

    connection.query(
        "SELECT id_trabajo FROM trabajo WHERE usuario_id = ? ORDER BY id_trabajo DESC LIMIT 1",
        [usuarioId],
        (error, results) => {
            if (error) {
                console.error("Error al obtener el último ID de trabajo por usuario", error);
                res.status(500).json({
                    error: "Error al obtener el último ID de trabajo por usuario",
                });
            } else {
                const ultimoID = results[0].id_trabajo;
                res.json({ ultimoID });
            }
        }
    );
};


module.exports = {
    obtenerTrabajo,
    obtenerTrabajoPorUsuario,
    crearTrabajo,
    eliminarTrabajo,
    obtenerUltimoIDTrabajoPorUsuario,
    obtenerTrabajoPorId
};