const express = require("express");
const cors = require('cors');
const trabajoControllers = require("../controllers/trabajoControllers");

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/', trabajoControllers.obtenerTrabajo);
router.post('/crearTrabajo', trabajoControllers.crearTrabajo);
router.delete('/:id_trabajo', trabajoControllers.eliminarTrabajo);

module.exports = router;