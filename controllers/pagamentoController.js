const Pagamento = require('../models/tb_pagamento');
// Importe também os modelos de Usuario e Plano, se necessário para algumas operações


const pagamentoController = {
  // Criar um novo pagamento
  criarPagamento: async (req, res) => {
    try {
      const { id_user, id_plano, valor, metodo, status } = req.body;
      const novoPagamento = await Pagamento.create({ id_user, id_plano, valor, metodo, status });
     
      return res.status(201).send(novoPagamento);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  // Buscar todos os pagamentos
  buscarTodosPagamentos: async (req, res) => {
    try {
      const pagamentos = await Pagamento.findAll();
      return res.status(200).send(pagamentos);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  // Buscar um pagamento pelo ID
  buscarPagamentoPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const pagamento = await Pagamento.findByPk(id);
      if (!pagamento) {
        return res.status(404).send({ message: 'Pagamento não encontrado.' });
      }
      return res.status(200).send(pagamento);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  // Atualizar um pagamento
  atualizarPagamento: async (req, res) => {
    try {
      const { id_pagamento } = req.params;
      const { id_user, id_plano, valor, metodo, status } = req.body;
      const pagamento = await Pagamento.findByPk(id_pagamento);
      if (!pagamento) {
        return res.status(404).send({ message: 'Pagamento não encontrado.' });
      }
      pagamento.id_user = id_user;
      pagamento.id_plano = id_plano;
      pagamento.valor = valor;
      pagamento.metodo = metodo;
      pagamento.status = status;
      await pagamento.save();

      if(status === 1){
        await registrarLog('Pagamento recebido com sucesso.', id_user);
      }else if(status === 2){
        await registrarLog('Pagamento não recebido.', id_user);
      }

      
      return res.status(200).send(pagamento);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  // Deletar um pagamento
  deletarPagamento: async (req, res) => {
    try {
      const { id } = req.params;
      const deletado = await Pagamento.destroy({ where: { id_pagamento: id } });
      if (!deletado) {
        return res.status(404).send({ message: 'Pagamento não encontrado.' });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
};

module.exports = pagamentoController;
