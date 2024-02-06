const express = require("express");
const codigo_verificacionControllers = require("../controllers/codigo_verificacionControllers");  // Asegúrate de tener el controlador de usuarios adecuado
const cors = require("cors");


const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/', codigo_verificacionControllers.obtenerCodigosDeVerificacion);

router.post('/ingresar_codigo', codigo_verificacionControllers.insertarCodigoVerificacion);

module.exports = router;
