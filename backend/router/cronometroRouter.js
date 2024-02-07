const express = require ('express');
const cronometroRouter = require("../controllers/cronometroControllers")
const cors = require("cors");

const router = express.Router();

router.use(cors());
router.use(express.json());

// ... tus otras importaciones y configuraciones

// Ruta para guardar el tiempo de trabajo
router.post('/', cronometroRouter.guardarTiempoTrabajo);

router.get('/:usuario_id', cronometroRouter.mostrarTiempoTrabajo)

// ... exportación del router


module.exports = router;

