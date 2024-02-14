const express = require("express");
const cors = require('cors');
const tarifaControllers = require("../controllers/tarifaControllers")

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/', tarifaControllers.obtenerTarifa);

module.exports = router;