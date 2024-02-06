const express = require("express");
const materialesUsadosControllers = require("../controllers/material_usadoControllers"); // Asegúrate de tener el controlador de materiales usados adecuado
const cors = require("cors");

const router = express.Router();

router.use(cors());
router.use(express.json());

// Obtener todos los materiales usados
router.get("/", materialesUsadosControllers.obtenerMaterialesUsados);

// Obtener un material usado por ID
router.get("/:id_material_usado", materialesUsadosControllers.obtenerMaterialUsadoPorId);

// Crear un nuevo material usado
router.post("/", materialesUsadosControllers.crearMaterialUsado);

// Actualizar un material usado por ID
router.put("/:id_material_usado", materialesUsadosControllers.actualizarMaterialUsadoPorId);

// Eliminar un material usado por ID
router.delete("/:id_material_usado", materialesUsadosControllers.eliminarMaterialUsadoPorId);

module.exports = router;