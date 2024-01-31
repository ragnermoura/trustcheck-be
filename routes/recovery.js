const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/recoveryController");

router.post("/alterar-senha", usuariosController.alterarSenha);
router.post("/enviar-altera-senha", usuariosController.enviarAlteraSenha);

module.exports = router;
