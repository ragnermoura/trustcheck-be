const express = require("express");
const router = express.Router();
const acessosController = require("../controllers/accessController");

router.post("/novo", acessosController.novoAcesso);
router.post("/enviaremail", acessosController.enviarEmailAcesso);

module.exports = router;