const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const  Usuario  = require("../models/tb_usuarios");
const Logado = require("../models/tb_logout");
const Log = require("../models/tb_logs");
const Perfil = require("../models/tb_perfil");
const Qrcode = require("../models/tb_qrcode");

const autenticarUsuario = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    const user = await Usuario.findOne({ where: { email: email }, });
    const perfil = await Perfil.findOne({ where: { id_user: user.id_user } });
    const qrCode = await Qrcode.findOne({ where: { id_user: user.id_user } });

    if (!user) {
      return res.status(401).send({
        mensagem: "Falha na autenticação.",
      });
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          id_user: user.id_user,
          nome: user.nome,
          sobrenome: user.sobrenome,
          email: user.email,
          avatar: user.avatar,
          id_plano: user.id_plano,
          id_nivel: user.id_nivel,
          id_status: user.id_status,
          periodo_teste: user.teste,
          inicio: user.createdAt,
          razao_social: perfil.razao_social,
          cnpj: perfil.cnpj,
          cpf: perfil.cpf,
          telefone: perfil.telefone,
          telefone2: perfil.telefone2,
          aniversario: perfil.aniversario,
          cep: perfil.cep,
          endereco: perfil.endereco,
          qrcode: qrCode.qrcode ? qrCode.qrcode : null,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "6h",
        }
      );

      await Logado.findOrCreate({
        where: { id_user: user.id_user },
        defaults: { status: 1 },
      }).then(([logado, created]) => {
        if (!created) {
          logado.update({ status: 1 });
        }
      });

      const logAtividade = await Log.create({
        atividade: '✅ Status: 200 - Usuário logado com sucesso',
        id_user:  user.id_user,
      });

      return res.status(200).send({
        mensagem: "Autenticado com sucesso!",
        token: token,
        id_status: user.id_status,
        id_nivel: user.id_nivel

      });
    } else {
      if(res.status == 401){
        const logAtividade = await Log.create({
          atividade: '❌ Status: 401 - Falha na autenticação.',
          id_user:  user.id_user,
        });
      }
      return res.status(401).send({ mensagem: "Falha na autenticação." });
    }
  } catch (error) {

    if(res.status == 500){
      const logAtividade = await Log.create({
        atividade: `❌ Status: 500 - erro ======> ${error.message}`,
        id_user:  user.id_user,
      });
    }

    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};
const logoutUsuario = async (req, res) => {
  try {
    const { id_user } = req.params;
    const novoStatus = 0;

    const resultado = await Logado.update(
      { status: novoStatus },
      { where: { id_user: id_user } }
    );

    const logAtividade = await Log.create({
      atividade: '✅ Status: 200 - Usuário deslogado com sucesso',
      id_user:  user.id_user,
    });

    if (resultado[0] > 0) {
      return res.status(200).send({ mensagem: "Logout realizado com sucesso." });
    } else {
      return res.status(404).send({ mensagem: "Registro de login não encontrado para atualização." });
    }
  } catch (error) {
    console.error("Erro ao realizar logout:", error);
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  autenticarUsuario,
  logoutUsuario
};