const express = require("express");
const Pesquisa = require("../models/tb_pesquisa");
const Usuario = require("../models/tb_usuarios");

const criarPesquisa = async (req, res) => {
  try {
    const { tipo, nome_completo, data_nascimento, nome_mae, cpf, rg, razao_social, cnpj, cep, endereco, ano, placa, chassi, renavam, id_user } = req.body;

    const novaPesquisa = await Pesquisa.create({
      tipo,
      nome_completo,
      data_nascimento,
      nome_mae,
      cpf,
      rg,
      razao_social,
      cnpj,
      cep,
      endereco,
      ano,
      placa,
      chassi,
      renavam,
      id_user
    });

    res.status(201).send({ mensagem: "Pesquisa criada com sucesso", pesquisa: novaPesquisa });
  } catch (error) {
    console.error('Erro ao criar pesquisa:', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

const buscarPesquisasPorUsuario = async (req, res) => {
  try {
    const { id_user } = req.params;

    // Buscando pesquisas de um usuário específico
    const pesquisas = await Pesquisa.findAll({
      where: { id_user },
      include: [{ model: Usuario, attributes: ['nome'] }]
    });

    if (pesquisas.length === 0) {
      return res.status(404).send('Nenhuma pesquisa encontrada para este usuário.');
    }

    res.send(pesquisas);
  } catch (error) {
    console.error('Erro ao buscar pesquisas:', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

module.exports = {
  criarPesquisa,
  buscarPesquisasPorUsuario
};
