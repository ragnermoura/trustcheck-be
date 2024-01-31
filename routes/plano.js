const express = require("express");
const router = express.Router();
const planosController = require("../controllers/planoController");


router.post("/cadastrar", planosController.criarPlano);
router.get("/", planosController.buscarTodosPlanos);
router.get("/buscar/:id_plano", planosController.buscarPlanoPorId);
router.put("/edit/:id_plano", planosController.atualizarPlano);
router.delete("/delete/:id_plano", planosController.deletarPlano);

module.exports = router;
