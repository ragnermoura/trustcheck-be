const express = require("express");
const Plano = require("../models/tb_plano");

const criarPlano = async (req, res) => {
  try {
    const { nome_plano, valor_plano, descricao } = req.body;
    const plano = await Plano.create({ nome_plano, valor_plano, descricao });
    res.status(201).send(plano);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const buscarTodosPlanos = async (req, res) => {
  try {
    const planos = await Plano.findAll();
    res.send(planos);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const buscarPlanoPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const plano = await Plano.findByPk(id);
    if (!plano) {
      return res.status(404).send({ mensagem: "Plano não encontrado." });
    }
    res.send(plano);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const atualizarPlano = async (req, res) => {
  try {
    const id = req.params.id;
    const { nome_plano, valor_plano, descricao } = req.body;

    const plano = await Plano.findByPk(id);
    if (!plano) {
      return res.status(404).send({ mensagem: "Plano não encontrado." });
    }

    plano.nome_plano = nome_plano;
    plano.valor_plano = valor_plano;
    plano.descricao = descricao;
    await plano.save();

    res.send({ mensagem: "Plano atualizado com sucesso!", plano });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deletarPlano = async (req, res) => {
  try {
    const id = req.params.id;
    const plano = await Plano.findByPk(id);
    if (!plano) {
      return res.status(404).send({ mensagem: "Plano não encontrado." });
    }

    await plano.destroy();
    res.send({ mensagem: "Plano deletado com sucesso!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  criarPlano,
  buscarTodosPlanos,
  buscarPlanoPorId,
  atualizarPlano,
  deletarPlano
};
