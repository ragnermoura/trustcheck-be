const express = require("express");
const Logs = require("../models/tb_logs");
const Usuario = require("../models/tb_usuarios");

const registrarLog = async (req, res) => {
  try {
    const { atividade, id_user } = req.body;

    const novoLog = await Logs.create({
      atividade,
      id_user
    });

    res.status(201).send({ mensagem: "Log registrado com sucesso", log: novoLog });
  } catch (error) {
    console.error('Erro ao registrar log:', error);
    res.status(500).send('Erro interno do servidor.');
  }
};
const buscarLogsPorUsuario = async (req, res) => {
  try {
    const { id_user } = req.params;

    // Buscando logs de um usuário específico
    const logs = await Logs.findAll({
      where: { id_user },
      include: [{ model: Usuario, attributes: ['nome'] }]
    });

    if (logs.length === 0) {
      return res.status(404).send('Nenhum log encontrado para este usuário.');
    }

    res.send(logs);
  } catch (error) {
    console.error('Erro ao buscar logs:', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

module.exports = {
  registrarLog,
  buscarLogsPorUsuario
};
