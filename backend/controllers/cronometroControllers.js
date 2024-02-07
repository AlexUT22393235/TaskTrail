const connection = require("../database");


// Asumiendo que ya tienes importada la conexión a tu base de datos
// const connection = require("../database");

const guardarTiempoTrabajo = (req, res) => {
    // Suponiendo que el tiempo viene en segundos
    const { descripcion, segundosTranscurridos, tipo_trabajo_id, tarifa_trabajo_id, usuario_id } = req.body;

    // Convertir segundos a horas, minutos y segundos
    const horas = Math.floor(segundosTranscurridos / 3600);
    const minutos = Math.floor((segundosTranscurridos % 3600) / 60);
    const segundos = segundosTranscurridos % 60;

    // Guarda el tiempo como prefieras, aquí guardamos en horas para simplificar
    const horas_trabajo = horas + minutos / 60 + segundos / 3600;

    connection.query(
        'INSERT INTO trabajo (descripcion, horas_trabajo, tipo_trabajo_id, tarifa_trabajo_id, usuario_id) VALUES (?, ?, ?, ?, ?)',
        [descripcion, horas_trabajo, tipo_trabajo_id, tarifa_trabajo_id, usuario_id],
        (error, results) => {
            if (error) {
                console.error('Error al guardar el tiempo de trabajo', error);
                return res.status(500).json({ error: 'Error al guardar el tiempo de trabajo' });
            }
            res.json({ message: 'Tiempo de trabajo guardado correctamente', trabajoId: results.insertId });
        }
    );
};





// Obtener todos los materiales usados
const mostrarTiempoTrabajo = (req, res) => {
    const { usuario_id } = req.params; // O cualquier otro criterio de búsqueda que necesites

    const query = `
      SELECT * FROM trabajo
      WHERE usuario_id = ?
    `;

    connection.query(query, [usuario_id], (error, results) => {
        if (error) {
            console.error("Error al obtener los tiempos de trabajo", error);
            return res.status(500).json({ error: "Error al obtener los tiempos de trabajo" });
        }

        res.json(results);
    });
};


module.exports = {
    guardarTiempoTrabajo,
    mostrarTiempoTrabajo,
};


