const connection = require("../database");

// Obtener todos los materiales usados
const obtenerMaterialesUsados = (req, res) => {
    connection.query("SELECT * FROM material_usado", (error, results) => {
        if (error) {
            console.error("Error al obtener los materiales usados", error);
            res.status(500).json({
                error: "Error al obtener los materiales usados",
            });
        } else {
            res.json(results);
        }
    });
};

// Obtener un material usado por ID
const obtenerMaterialUsadoPorId = (req, res) => {
    const id = req.params.id_material_usado;
    connection.query("SELECT * FROM material_usado WHERE id_material_usado = ?", [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: "Ocurrió un error al obtener el material usado" });
        } else if (results.length === 0) {
            res.status(404).json({ error: "El material usado no fue encontrado" });
        } else {
            res.json(results[0]);
        }
    });
};

// Crear un nuevo material usado
const crearMaterialUsado = (req, res) => {
    const { nombre_material, cantidad, precio_material } = req.body;

    // Verificar que se proporcionen todos los datos necesarios
    if (!nombre_material || cantidad == null || precio_material == null) {
        return res.status(400).json({ error: 'Falta información del material usado' });
    }

    // Almacenar el nuevo material usado en la base de datos
    connection.query(
        'INSERT INTO material_usado (nombre_material, cantidad, precio_material) VALUES (?, ?, ?)',
        [nombre_material, cantidad, precio_material],
        (error, results) => {
            if (error) {
                console.error('Error al agregar el material usado', error);
                return res.status(500).json({ error: 'Error al agregar el material usado' });
            }

            res.json({ message: 'Material usado agregado correctamente' });
        }
    );
};

// Actualizar un material usado por ID
const actualizarMaterialUsadoPorId = (req, res) => {
    const id = req.params.id_material_usado;
    const { nombre_material, cantidad, precio_material } = req.body;
    connection.query(
        "UPDATE material_usado SET nombre_material=?, cantidad=?, precio_material=? WHERE id_material_usado=?",
        [nombre_material, cantidad, precio_material, id],
        (error, results) => {
            if (error) {
                console.error("Error al actualizar el material usado", error);
                res.status(500).json({ error: "Error al actualizar el material usado" });
            } else {
                res.json({ message: "Material usado actualizado correctamente" });
            }
        }
    );
};

// Eliminar un material usado por ID
const eliminarMaterialUsadoPorId = (req, res) => {
    const id = req.params.id_material_usado;
    connection.query("DELETE FROM material_usado WHERE id_material_usado = ?", [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: "Ocurrió un error al eliminar el material usado" });
        } else {
            res.json({ message: "Material usado eliminado correctamente" });
        }
    });
};

module.exports = {
    obtenerMaterialesUsados,
    obtenerMaterialUsadoPorId,
    crearMaterialUsado,
    actualizarMaterialUsadoPorId,
    eliminarMaterialUsadoPorId,
};