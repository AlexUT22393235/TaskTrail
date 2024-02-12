const connection = require("../database");

const obtenerTipoTrabajo = (req, res) => {
    connection.query("SELECT * FROM tipo_trabajo", (error, results) => {
        if (error) {
            console.error("Error al obtener tipo_trabajo", error);
            res.status(500).json({
                error: "Error al obtener tipo_trabajo",
            });
        } else {
            res.json(results);
        }
    });
};

module.exports = {
    obtenerTipoTrabajo
};
