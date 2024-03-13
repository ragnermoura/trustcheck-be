const express = require("express");
const router = express.Router();
const planosController = require("../controllers/planoController");


router.get("/", planosController.buscarTodosPlanos);
router.get("/items", planosController.buscarTodosItens);
router.post("/cadastrar", planosController.criarPlano);
router.get("/buscar/:id_plano", planosController.buscarPlanoPorId);
router.put("/edit/:id_plano", planosController.atualizarPlano);
router.delete("/delete/:id_plano", planosController.deletarPlano);

module.exports = router;
