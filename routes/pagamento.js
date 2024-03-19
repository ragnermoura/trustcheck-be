const express = require('express');
const pagamentoController = require('../controllers/pagamentoController');
const router = express.Router();

// Rota para criar um novo pagamento
router.post('/pagamentos', pagamentoController.criarPagamento);
router.get('/pagamentos', pagamentoController.buscarTodosPagamentos);
router.get('/pagamentos/:id', pagamentoController.buscarPagamentoPorId);
router.put('/pagamentos/:id', pagamentoController.atualizarPagamento);
router.delete('/pagamentos/:id', pagamentoController.deletarPagamento);

module.exports = router;
