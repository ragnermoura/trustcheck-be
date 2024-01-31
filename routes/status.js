const express = require("express");
const router = express.Router();
const statusController = require("../controllers/statusController");


router.post("/cadastrar", statusController.criarStatus);
router.get("/", statusController.obterStatus);
router.get("/:id_status", statusController.obterStatusPorId);
router.put("/:id_status", statusController.atualizarStatus);
router.delete("/:id_status", statusController.deletarStatus);

module.exports = router;
