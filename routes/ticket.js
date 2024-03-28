const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");


router.post("/cadastrar", ticketController.criarTicket);
router.get("/", ticketController.obterTickets);
router.get("/:id_user", ticketController.obterTicketPorId);
router.put("/:id_ticket", ticketController.atualizarTicket);
router.delete("/:id_status", ticketController.deletarTicket);

module.exports = router;
