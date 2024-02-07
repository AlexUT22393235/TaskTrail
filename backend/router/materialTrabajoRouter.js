const express = require("express");
const trabajoControllers = require("../controllers/materialTrabajoControllers");  // Asegúrate de tener el controlador de trabajo adecuado
const cors = require("cors");

const router = express.Router();

router.use(cors());
router.use(express.json());


router.get("/:id_trabajo/materiales", trabajoControllers.obtenerMaterialesPorTrabajo);

router.get("/:id_trabajo/detalles", trabajoControllers.obtenerDetallesTrabajo);


module.exports = router;