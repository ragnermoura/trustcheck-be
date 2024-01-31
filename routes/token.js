const express = require("express");
const router = express.Router();
const tokensController = require("../controllers/tokenController");

// Rota para criar um novo token
router.post("/cadastrar", tokensController.criarToken);
router.get("/buscar", tokensController.buscarTodosTokens);
router.get("/buscar/:id_token", tokensController.buscarTokenPorId);
router.put("/edit/:id_token", tokensController.atualizarToken);
router.delete("/delete/:id_token", tokensController.deletarToken);

module.exports = router;
