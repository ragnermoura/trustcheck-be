const express = require("express");
const router = express.Router();
const consultaController = require("../controllers/consultaController");

router.post("/credito", consultaController.cadastrarConsultas);
router.get("/:id_user", consultaController.obterConsultaPorId);
router.patch("/edit", consultaController.atualizarConsulta);

module.exports = router;