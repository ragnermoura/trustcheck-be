const express = require("express");
const Consulta = require("../models/tb_consulta_count");


const obterConsultaPorId = async (req, res, next) => {
    try {
        const consulta = await Consulta.findOne({
            where: { id_user: req.params.id_user }
        });
        if (!consulta) {
            return res.status(404).send({ message: "Usuário não encontrado" });
        }
        return res.status(200).send(consulta);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};
const cadastrarConsultas = async (req, res, next) => {
    try {
        const credito = await Consulta.create({
            id_user: req.body.id_user,
            consultas: req.body.consultas,

        });
        const response = {
            mensagem: "Créditos cadastrados com sucesso",
            usuarioCriado: {
                id_user: credito.id_user,
                consultas: credito.consultas,
                request: {
                    tipo: "GET",
                    descricao: "Pesquisar os usuário",
                    url: `https://trustchecker.com.br/api//usuarios/${novoUsuario.id_user}`,
                },
            },
        };

        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};
const atualizarConsulta = async (req, res, next) => {
    try {
      const id_user = req.body.id_user;
      const consultas = req.body.consultas;
  
      const [updated] = await Consulta.update({ consultas: consultas }, { where: { id_user: id_user } });
  
      if (updated) {
        console.log(`Consulta atualizada com sucesso: ${id_user}`);
        return res.status(201).send({ mensagem: "Dados de consultas alterados com sucesso!" });
      } else {
        return res.status(404).send({ message: "Usuário não encontrado" });
      }
    } catch (error) {
      console.error("Erro na atualização do usuário:", error);
      return res.status(500).send({ error: error.message });
    }
  };

module.exports = {
    obterConsultaPorId,
    cadastrarConsultas,
    atualizarConsulta
};