const express = require("express");
const router = express.Router();
const niveisController = require("../controllers/nivelController");


router.get("/", niveisController.obterNiveis);
router.get("/:id_nivel", niveisController.obterNivelPorId);
router.post("/cadastro", niveisController.criarNivel);
router.put("/:id_nivel", niveisController.atualizarNivel);
router.delete("/:id_nivel", niveisController.deletarNivel);

module.exports = router;
