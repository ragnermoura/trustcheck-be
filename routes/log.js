const express = require("express");
const router = express.Router();
const logsController = require("../controllers/logsController");

router.post("/registrar", logsController.registrarLog);
router.get("/usuario/:id_user", logsController.buscarLogsPorUsuario);

module.exports = router;