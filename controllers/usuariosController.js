const bcrypt = require("bcrypt");
const path = require('path');
const fs = require("fs").promises;
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');
const User = require("../models/tb_usuarios");
const Perfil = require("../models/tb_perfil");
const Token = require("../models/tb_token");
const Plano = require("../models/tb_plano");
const ConsultaCount = require("../models/tb_consulta_count");
const Log = require("../models/tb_logs");
const SendDoc = require("../models/tb_documentos");
const Qrcode = require("../models/tb_qrcode");
const Logsconsultas = require("../models/tb_logs_consultas");
const Ticket = require("../models/tb_ticket");
const Pesquisa = require("../models/tb_pesquisa");
const Pagamento = require("../models/tb_pagamento");
const Documento = require("../models/tb_documentos");
const Acessos = require("../models/tb_acesso");

require('dotenv').config();

const obterUsuarios = async (req, res, next) => {
  try {
    const usuarios = await User.findAll({
      include: [{
        model: Perfil,
        as: 'Perfil'
      }]
    });
    return res.status(200).send({ response: usuarios });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const obterUsuarioPorId = async (req, res, next) => {
  try {
    const usuario = await User.findByPk(req.params.id_user);
    if (!usuario) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    return res.status(200).send({ response: usuario });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const atualizarUsuario = async (req, res, next) => {
  try {
    const usuario = await User.findByPk(req.body.id_user);
    if (!usuario) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    usuario.nome = req.body.nome;
    usuario.sobrenome = req.body.sobrenome;
    usuario.email = req.body.email;
    usuario.id_nivel = req.body.nivel;
    usuario.id_status = req.body.status;
    await usuario.save();
    return res
      .status(201)
      .send({ mensagem: "Dados de usuário alterados com sucesso!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const atualizarDadosUsuario = async (req, res, next) => {
  try {
    const id_user = req.body.id_user;
    const plano = req.body.plano;

    const [updated] = await User.update({ id_plano: plano }, { where: { id_user: id_user } });

    const planoEscolhido = await Plano.findByPk(plano);
    if (!planoEscolhido) {
      return res.status(404).send({ message: "Plano não encontrado" });
    }

    const consultaExistente = await ConsultaCount.findOne({ where: { id_user: id_user } });

    if (consultaExistente) {
      await consultaExistente.update({ consultas: planoEscolhido.qtd_pesquisas.toString() });
    } else {

      await ConsultaCount.create({
        id_user: id_user,
        consultas: planoEscolhido.qtd_pesquisas
      });
    }

    if (updated) {
      console.log(`Usuário atualizado com sucesso: ${id_user}`);
      return res.status(201).send({ mensagem: "Dados de usuário alterados com sucesso!" });
    } else {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

  } catch (error) {
    console.error("Erro na atualização do usuário:", error);
    return res.status(500).send({ error: error.message });
  }
};
const atualizarStatusUsuario = async (req, res, next) => {
  try {
    const id_user = req.body.id_user;
    const status = req.body.id_status;

    const [updated] = await User.update({ id_status: status }, { where: { id_user: id_user } });

    if (updated) {
      console.log(`Usuário atualizado com sucesso: ${id_user}`);
      return res.status(201).send({ mensagem: "Dados de usuário alterados com sucesso!" });
    } else {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    console.error("Erro na atualização do usuário:", error);
    return res.status(500).send({ error: error.message });
  }
};
const excluirUsuario = async (req, res, next) => {
  try {
    const userId = req.params.id_user;

    // Excluindo registros dependentes primeiro
    await ConsultaCount.destroy({
      where: { id_user: userId }
    });

    await Perfil.destroy({
      where: { id_user: userId }
    });

    await Log.destroy({
      where: { id_user: userId }
    });

    await Logsconsultas.destroy({
      where: { id_user: userId }
    });

    await Token.destroy({
      where: { id_user: userId }
    });

    await Ticket.destroy({
      where: { id_user: userId }
    });

    await Pesquisa.destroy({
      where: { id_user: userId }
    });

    await Pagamento.destroy({
      where: { id_user: userId }
    });

    await Qrcode.destroy({
      where: { id_user: userId }
    });

    await Documento.destroy({
      where: { id_user: userId }
    });

    await Acessos.destroy({
      where: { id_user: userId }
    });


    // Excluindo o usuário
    const deletado = await User.destroy({
      where: { id_user: userId }
    });

    if (deletado) {
      return res.status(200).send({ message: 'Usuário excluido com sucesso!' });
    } else {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const cadastrarUsuario = async (req, res, next) => {
  try {
    const usuarioExistente = await User.findOne({
      where: { email: req.body.email },
    });
    if (usuarioExistente) {
      return res
        .status(409)
        .send({
          mensagem: "Email já cadastrado, por favor insira um email diferente!",
        });
    }


    const perfilExistente = await Perfil.findOne({
      where: { cnpj: req.body.cnpj },
    });
    if (perfilExistente) {
      return res
        .status(410)
        .send({
          mensagem: "Cnpj já cadastrado, por favor insira um CNPJ diferente!",
        });
    }
    const hashedPassword = await bcrypt.hash(req.body.senha, 10);
    const htmlFilePath = path.join(__dirname, '../template/welcome/index.html');
    let htmlContent = await fs.readFile(htmlFilePath, "utf8");
    const filename = req.file ? req.file.filename : "default-avatar.png";
    const qrData = `Nome: ${req.body.nome}, Sobrenome: ${req.body.sobrenome}, Email: ${req.body.email},  Avatar: ${filename}`;
    const qrCodeURL = await QRCode.toDataURL(qrData);

    const novoUsuario = await User.create({
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      email: req.body.email,
      senha: hashedPassword,
      id_status: req.body.status,
      id_nivel: req.body.nivel,
      teste: req.body.teste,
      avatar: `/avatar/${filename}`,
    });
    const tokenUsuario = await Token.create({
      id_user: novoUsuario.id_user,
      token: uuidv4(),
    });
    const novoperfil = await Perfil.create({
      razao_social: req.body.razao_social,
      cnpj: req.body.cnpj,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      telefone2: req.body.telefone2,
      aniversario: req.body.aniversario,
      cep: req.body.cep,
      endereco: req.body.endereco,
      tem_cnpj: req.body.tem_cnpj,
      termos: req.body.termos,
      id_user: novoUsuario.id_user,
    });
    const logAtividade = await Log.create({
      atividade: ' Status: 202 - Usuário cadastrado com sucesso',
      id_user: novoUsuario.id_user,
    });
    const novoQrcode = await Qrcode.create({
      qrcode: qrCodeURL,
      id_user: novoUsuario.id_user
     ,
    });

    htmlContent = htmlContent
      .replace("{{nome}}", novoUsuario.nome)
      .replace("{{emailclient}}", novoUsuario.email)
      .replace("{{id}}", novoUsuario.id_user)
      .replace("{{perfil}}", novoperfil.id_perfil)

    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        ciphers: "TLSv1",
      },
    });


    let mailOptions = {
      from: `"Atendimento Trust" ${process.env.EMAIL_FROM}`,
      to: novoUsuario.email,
      subject: "✅ Conta criada com sucesso!",
      html: htmlContent,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Mensagem enviada: %s", info.messageId);

    const response = {
      mensagem: "Usuário cadastrado com sucesso e Token unico gerado!",
      usuarioCriado: {
        id_user: novoUsuario.id_user,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        nivel: novoUsuario.id_nivel,
        token_unico: tokenUsuario.token,
        id_perfil: novoperfil.id_perfil,
        log: logAtividade.id_log,
        qrcode: novoQrcode.qrcode,
        request: {
          tipo: "GET",
          descricao: "Pesquisar um usuário",
          url: `https://trustchecker.com.br/api/usuarios/${novoUsuario.id_user}`,
        },
      },
    };

    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const cadastrarUsuarioSimples = async (req, res, next) => {
  try {
    const usuarioExistente = await User.findOne({
      where: { email: req.body.email },
    });
    if (usuarioExistente) {
      return res
        .status(409)
        .send({
          mensagem: "Email já cadastrado, por favor insira um email diferente!",
        });
    }


    
    const hashedPassword = await bcrypt.hash(req.body.senha, 10); 
    const filename = req.file ? req.file.filename : "default-avatar.png";
    const qrData = `Nome: ${req.body.nome}, Sobrenome: ${req.body.sobrenome}, Email: ${req.body.email},  Avatar: ${filename}`;
    const qrCodeURL = await QRCode.toDataURL(qrData);

    const novoUsuario = await User.create({
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      email: req.body.email,
      senha: hashedPassword,
      id_status: req.body.status,
      id_nivel: req.body.nivel,
      teste: req.body.teste,
      avatar: `/avatar/${filename}`,
    });
    const tokenUsuario = await Token.create({
      id_user: novoUsuario.id_user,
      token: uuidv4(),
    });
   
    const logAtividade = await Log.create({
      atividade: ' Status: 202 - Usuário cadastrado com sucesso',
      id_user: novoUsuario.id_user,
    });
    const novoQrcode = await Qrcode.create({
      qrcode: qrCodeURL,
      id_user: novoUsuario.id_user
     ,
    });

    const response = {
      mensagem: "Usuário cadastrado com sucesso e Token unico gerado!",
      usuarioCriado: {
        id_user: novoUsuario.id_user,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        nivel: novoUsuario.id_nivel,
        token_unico: tokenUsuario.token,
        log: logAtividade.id_log,
        qrcode: novoQrcode.qrcode,
        request: {
          tipo: "GET",
          descricao: "Pesquisar um usuário",
          url: `https://trustchecker.com.br/api/usuarios/${novoUsuario.id_user}`,
        },
      },
    };

    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const envioDocumentos = async (req, res, next) => {
  try {
    if (req.files && req.files.length > 0) {
      const documentos = await Promise.all(req.files.map(file => {
        return SendDoc.create({
          rg: `/documento/rg/${file.filename}`,
          cnpj: `/documento/cnpj/${file.filename}`,
          id_user: req.body.id_user,
        });
      }));

      const usuario = await User.findByPk(req.body.id_user);
      if (!usuario) {
        return res.status(404).send({ message: "Usuário não encontrado para envio de email." });
      }

      const nome = usuario.nome;
      const email = usuario.email;

      const htmlFilePath = path.join(__dirname, '../template/alerts/conta.html');
      let htmlContent = await fs.readFile(htmlFilePath, "utf8");

      htmlContent = htmlContent
        .replace("{{nome}}", nome)
        .replace("{{emailclient}}", email)
        .replace("{{nomeclient}}", nome);

      let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          ciphers: "TLSv1",
        },
      });

      let mailOptions = {
        from: `"Atendimento Trust" ${process.env.EMAIL_FROM}`,
        to: 'humberto@trustsystemalert.com.br, ragnermoura@gmail.com',
        subject: "✅ Nova conta criada",
        html: htmlContent,
      };

      await transporter.sendMail(mailOptions);
      console.log("Email enviado com sucesso para:", email);

      const response = {
        mensagem: "Documento(s) cadastrado(s) com sucesso e email enviado!",
        documentosCadastrados: documentos,
      };

      return res.status(201).send(response);
    } else {

      return res.status(400).send({ mensagem: "Nenhum documento enviado." });
    }
  } catch (error) {
    console.error("Erro ao criar documentos ou enviar email: ", error);
    return res.status(500).send({ mensagem: "Erro ao criar documento ou enviar email", error: error.message });
  }
};

module.exports = {
  obterUsuarios,
  obterUsuarioPorId,
  atualizarUsuario,
  excluirUsuario,
  cadastrarUsuario,
  cadastrarUsuarioSimples,
  atualizarDadosUsuario,
  atualizarStatusUsuario,
  envioDocumentos,

};