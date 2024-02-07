const express = require("express");
const cors = require('cors');
const tipoTrabajoControllers = require("../controllers/tipoTrabajoControllers")

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/', tipoTrabajoControllers.obtenerTipoTrabajo);

module.exports = router;