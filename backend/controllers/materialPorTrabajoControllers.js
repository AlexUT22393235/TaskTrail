const connection = require("../database");

const obtenerMaterialPorTrabajo = (req, res) => {
    connection.query("SELECT * FROM material_por_trabajo", (error, results) => {
        if (error) {
            console.error("Error al obtener material por trabajo", error);
            res.status(500).json({
                error: "Error al obtener material por trabajo",
            });
        } else {
            res.json(results);
        }
    });

};

const agregarMaterialPorTrabajo = (req, res) => {
    const { material_usado_id, trabajo_id } = req.body;

    connection.query(
        "INSERT INTO material_por_trabajo (material_usado_id, trabajo_id) VALUES (?, ?)",
        [material_usado_id, trabajo_id],
        (error, results) => {
            if (error) {
                console.error("Error al agregar material por trabajo", error);
                res.status(500).json({
                    error: "Error al agregar material por trabajo",
                });
            } else {
                const materialPorTrabajoId = results.insertId;
                res.json({ id: materialPorTrabajoId, message: "Material por trabajo agregado exitosamente" });
            }
        }
    );
};

module.exports = {
    obtenerMaterialPorTrabajo,
    agregarMaterialPorTrabajo
};
