const connection = require("../database");

const obtenerMaterialesPorTrabajo = (req, res) => {
    const idTrabajo = req.params.id_trabajo;
    const query = `
        SELECT mu.nombre_material, mu.cantidad, mu.precio_material
        FROM material_por_trabajo mpt
        INNER JOIN material_usado mu ON mpt.material_usado_id = mu.id_material_usado
        WHERE mpt.trabajo_id = ?
    `;
    connection.query(query, [idTrabajo], (error, results) => {
        if (error) {
            console.error('Error al obtener materiales del trabajo:', error);
            res.status(500).json({ error: 'Error al obtener materiales del trabajo' });
        } else {
            res.json(results);
        }
    });
};

const obtenerDetallesTrabajo = (req, res) => {
    const idTrabajo = req.params.id_trabajo;
    const query = `
    SELECT 
    t.descripcion AS tipo_trabajo, 
    mu.nombre_material, 
    mu.precio_material, 
    mu.cantidad,
    t.horas_trabajo,
    tt.valor_tarifa AS tarifa_trabajo,
    (t.horas_trabajo * tt.valor_tarifa) AS total_horas,
    (mu.precio_material * mu.cantidad) AS total_materiales,
    ((t.horas_trabajo * tt.valor_tarifa) + (mu.precio_material * mu.cantidad)) AS total_general
FROM 
    trabajo t
INNER JOIN 
    material_por_trabajo mpt ON t.id_trabajo = mpt.trabajo_id
INNER JOIN 
    material_usado mu ON mpt.material_usado_id = mu.id_material_usado
INNER JOIN
    tarifa_trabajo tt ON t.tarifa_trabajo_id = tt.id_tarifa_trabajo
WHERE 
    t.id_trabajo = '1';
    `;
    connection.query(query, [idTrabajo], (error, results) => {
        if (error) {
            console.error('Error al obtener detalles del trabajo:', error);
            res.status(500).json({ error: 'Error al obtener detalles del trabajo' });
        } else {
            res.json(results);
        }
    });
};

module.exports = {
    obtenerMaterialesPorTrabajo,
    obtenerDetallesTrabajo,
};
