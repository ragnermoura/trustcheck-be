const express = require("express");
const router = express.Router();
const termosController = require("../controllers/termosController");


router.post("/cadastrar", termosController.criarTermo);
router.get("/", termosController.obterTermos);
router.get("/:id_termo", termosController.obterTermoPorId);
router.patch("/:id_termo", termosController.atualizarTermo);
router.delete("/:id_termo", termosController.deletarTermo);

module.exports = router;
