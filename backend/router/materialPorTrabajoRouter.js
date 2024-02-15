const express = require("express");
const cors = require('cors');

const materialPorTrabajoControllers = require('../controllers/materialPorTrabajoControllers');


const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/', materialPorTrabajoControllers.obtenerMaterialPorTrabajo)
router.post('/agregarMaterialPorTrabajo', materialPorTrabajoControllers.agregarMaterialPorTrabajo);

module.exports = router;
