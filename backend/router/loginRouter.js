const express = require ('express');
const loginController = require("../controllers/loginControllers")
const cors = require("cors");

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/', loginController.login);

module.exports = router;