const express = require('express');
const pagamentoController = require('../controllers/pagamentoController');
const router = express.Router();

// Rota para criar um novo pagamento
router.post('/pagamentos', pagamentoController.criarPagamento);

// Rota para buscar todos os pagamentos
router.get('/pagamentos', pagamentoController.buscarTodosPagamentos);

// Rota para buscar um pagamento específico pelo ID
router.get('/pagamentos/:id', pagamentoController.buscarPagamentoPorId);

// Rota para atualizar um pagamento existente
router.put('/pagamentos/:id', pagamentoController.atualizarPagamento);

// Rota para deletar um pagamento
router.delete('/pagamentos/:id', pagamentoController.deletarPagamento);

module.exports = router;
