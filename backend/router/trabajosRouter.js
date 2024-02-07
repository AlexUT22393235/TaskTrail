const express = require("express");
const trabajoControllers = require("../controllers/trabajosControllers");  // Asegúrate de tener el controlador de trabajo adecuado
const cors = require("cors");

const router = express.Router();

router.use(cors());
router.use(express.json());

// Obtener todos los trabajos
router.get("/", trabajoControllers.obtenerTrabajos);

// Obtener un trabajo por ID
router.get("/:id_trabajo", trabajoControllers.obtenerTrabajoPorId);

// Crear un nuevo trabajo
router.post("/", trabajoControllers.crearTrabajo);

// Actualizar un trabajo por ID
router.put("/:id_trabajo", trabajoControllers.actualizarTrabajoPorId);

// Eliminar un trabajo por ID
router.delete("/:id_trabajo", trabajoControllers.eliminarTrabajoPorId);

// Puedes agregar otras rutas o acciones según tus necesidades
router.get("/", trabajoControllers.obtenerTrabajosTabla);


module.exports = router;
