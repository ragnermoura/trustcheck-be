const express = require("express");
const Logsconsultas = require("../models/tb_logs_consultas");

const registrarConsulta = async (req, res) => {
    try {
        const { label_pesquisa, id_user } = req.body;

        const novaConsulta = await Logsconsultas.create({
            label_pesquisa,
            id_user,
        });

        return res.status(201).send({
            mensagem: "Log de consulta registrado com sucesso!",
            logConsulta: novaConsulta,
        });
    } catch (error) {
        console.error("Erro ao registrar log de consulta:", error);
        return res.status(500).send({ erro: error.message });
    }
};
const listarConsultasPorUsuario = async (req, res) => {
    try {
        const { id_user } = req.params; 

        const consultas = await Logsconsultas.findAll({
            where: { id_user: id_user },
        });

        if (consultas && consultas.length > 0) {
            return res.status(200).send(consultas);
        } else {
            return res.status(404).send({ mensagem: "Nenhum log de consulta encontrado para o usuário." });
        }
    } catch (error) {
        console.error("Erro ao listar logs de consulta:", error);
        return res.status(500).send({ erro: error.message });
    }
};

module.exports = {
    registrarConsulta,
    listarConsultasPorUsuario,
};