const connection = require("../database");

const obtenerTarifa = (req, res) => {
    connection.query("SELECT * FROM tarifa_trabajo", (error, results) => {
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
    obtenerTarifa
};
