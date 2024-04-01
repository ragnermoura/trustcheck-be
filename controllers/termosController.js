const express = require('express');

const Termos = require('../models/tb_termos');

const obterTermos = async (req, res, next) => {
  try {
    const termos = await Termos.findAll();
    return res.status(200).send({ response: termos });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const obterTermoPorId = async (req, res, next) => {
  try {
    const termo = await Termos.findByPk(req.params.id_termo);
    if (termo) {
      return res.status(200).send({ response: termo });
    } else {
      return res.status(404).send({ message: 'Termo não encontrado' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const criarTermo = async (req, res, next) => {
  try {
    const novoTermo = await Termos.create(req.body);
    return res.status(201).send({ response: novoTermo });
  } catch (error) {
    console.error("Erro ao criar termo: ", error);
    return res.status(500).send({ error: error.message });
  }
};

const atualizarTermo = async (req, res, next) => {
  try {
    const termoAtualizado = await Termos.update(req.body, {
      where: { id_termo: req.params.id_termo }
    });
    if (termoAtualizado[0]) {
      return res.status(200).send({ message: 'Termo atualizado com sucesso' });
    } else {
      return res.status(404).send({ message: 'Termo não encontrado' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deletarTermo = async (req, res, next) => {
  try {
    const deletado = await Termos.destroy({
      where: { id_termo: req.params.id_termo }
    });
    if (deletado) {
      return res.status(200).send({ message: 'Termo deletado com sucesso' });
    } else {
      return res.status(404).send({ message: 'Termo não encontrado' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  obterTermos,
  obterTermoPorId,
  criarTermo,
  atualizarTermo,
  deletarTermo
};
