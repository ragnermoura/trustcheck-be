const bcrypt = require("bcrypt");
const path = require('path');
const fs = require("fs").promises;
const nodemailer = require("nodemailer");
const User = require("../models/tb_usuarios");
const Perfil = require("../models/tb_perfil");

require('dotenv').config();

const obterUsuarios = async (req, res, next) => {
  try {
    const usuarios = await User.findAll();
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
    const usuario = await User.findByPk(req.body.id_user);
    if (!usuario) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    usuario.education = req.body.education;
    usuario.phonenumber = req.body.phonenumber;
    usuario.address = req.body.address;
    usuario.zipcode = req.body.zipcode;
    usuario.country = req.body.country;
    usuario.language = req.body.language;

    await usuario.save();
    return res
      .status(201)
      .send({ mensagem: "Dados de usuário alterados com sucesso!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const excluirUsuario = async (req, res, next) => {
  try {
    const deletado = await User.destroy({ 
      where: { id_user: req.params.id_user }
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
    const hashedPassword = await bcrypt.hash(req.body.senha, 10);

    const novoUsuario = await User.create({
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      email: req.body.email,
      senha: hashedPassword,
      id_status: req.body.status,
      id_nivel: req.body.nivel
     
      
    });
    const response = {
      mensagem: "Usuário cadastrado com sucesso",
      usuarioCriado: {
        id_user: novoUsuario.id_user,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        nivel: novoUsuario.id_nivel,
        request: {
          tipo: "GET",
          descricao: "Pesquisar um usuário",
          url: `https://trustchecker.com.br/api//usuarios/${novoUsuario.id_user}`,
        },
      },
    };

    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const enviarBoasVindas = async (req, res) => {
  const { email, nome, id, perfil } = req.body;
  try {
    const htmlFilePath = path.join(__dirname, '../template/welcome/index.html');
    let htmlContent = await fs.readFile(htmlFilePath, "utf8");

    htmlContent = htmlContent
      .replace("{{nome}}", nome)
      .replace("{{emailclient}}", email)
      .replace("{{id}}", id)
      .replace("{{perfil}}", perfil)

    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true, // true para porta 465, false para outras portas
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
      to: email,
      subject: "✅ Conta criada com sucesso!",
      html: htmlContent,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Mensagem enviada: %s", info.messageId);
    res.send("Email enviado com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar email: ", error);
    res.send("Erro ao enviar email.");
  }
};
const enviarAdmConta = async (req, res) => {
  const { email, nomecliente } = req.body;
  const nome = 'Humberto'
  try {
    const htmlFilePath = path.join(__dirname, '../template/alerts/conta.html');
    let htmlContent = await fs.readFile(htmlFilePath, "utf8");

    htmlContent = htmlContent
      .replace("{{nome}}", nome)
      .replace("{{emailclient}}", email)
      .replace("{{nomeclient}}", nomecliente)

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

    let info = await transporter.sendMail(mailOptions);
    console.log("Mensagem enviada: %s", info.messageId);
    res.send("Email enviado com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar email: ", error);
    res.send("Erro ao enviar email.");
  }
};


const uploadImage = async (req, res) => {

  const { id_user } = req.params

  const { filename } = req.file

  const update = {
    avatar: `/avatar/${filename}`
  }

  try {

    await User.update(update, {
      where: {
        id_user
      }
    }
    )

    return res.status(201).json({
      success: true,
      mensagem: 'Imagem cadastrada com sucesso!',
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Ocorreu um erro'
    })
  }
}
const getImage = async (req, res) => {

  try {

    const { id_user } = req.params

    const image = await User.findOne({
      where: { id_user },
      attributes: ['avatar']
    })

    res.status(200).json({
      success: true,
      message: 'Sucesso',
      image
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Ocorreu um erro'
    })
  }

}
module.exports = {
  obterUsuarios,
  obterUsuarioPorId,
  atualizarUsuario,
  excluirUsuario,
  cadastrarUsuario,
  getImage,
  uploadImage,
  atualizarDadosUsuario,

  enviarBoasVindas,
  enviarAdmConta,
  
};