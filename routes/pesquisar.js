const express = require("express");
const router = express.Router();
const pesquisasController = require("../controllers/pesquisarController");

router.post("/criar", pesquisasController.criarPesquisa);
router.get("/usuario/:id_user", pesquisasController.buscarPesquisasPorUsuario);

module.exports = router;
