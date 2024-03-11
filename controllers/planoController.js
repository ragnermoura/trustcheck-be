const express = require("express");
const Plano = require("../models/tb_plano");

const criarPlano = async (req, res) => {
  try {
    const { titulo_plano, subtitulo_plano, valor_plano_consulta, valor_plano_mes, tag } = req.body;
    const plano = await Plano.create({ titulo_plano, subtitulo_plano, valor_plano_consulta, valor_plano_mes, tag });
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
    const id_plano = req.params.id_plano;
    const plano = await Plano.findByPk(id_plano);
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
    const id_plano = req.paraid_plano;
    const { titulo_plano, subtitulo_plano, valor_plano_consulta, valor_plano_mes, tag } = req.body;

    const plano = await Plano.findByPk(id_plano);
    if (!plano) {
      return res.status(404).send({ mensagem: "Plano não encontrado." });
    }

    plano.titulo_plano = titulo_plano;
    plano.subtitulo_plano = subtitulo_plano;
    plano.valor_plano_consulta = valor_plano_consulta;
    plano.valor_plano_mes = valor_plano_mes;
    plano.tag = tag;

    await plano.save();

    res.send({ mensagem: "Plano atualizado com sucesso!", plano });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deletarPlano = async (req, res) => {
  try {
    const id_plano = req.params.id_plano;
    const plano = await Plano.findByPk(id_plano);
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
