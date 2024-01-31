const bcrypt = require("bcrypt");
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const User = require("../models/tb_usuarios");

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
    const usuario = await User.findByPk(req.body.id_user);
    if (!usuario) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    await usuario.destroy();
    return res.status(202).send({ mensagem: "Usuário excluído com sucesso!" });
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
      id_plano: req.body.id_plano,
      id_status: req.body.status,
      id_nivel: req.body.nivel,


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
          url: `http://localhost:3000/usuarios/${novoUsuario.id_user}`,
        },
      },
    };

    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const enviarBoasVindas = async (req, res) => {
  try {
    const usuario = await User.findOne({ where: { email: req.body.email } });
    if (!usuario) {
      return res.status(404).send('E-mail não encontrado.');
    }

    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.PORTA,
      secure: process.env.SECURITY,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const templatePath = path.join(__dirname, '../template/welcome.html');
    let html = fs.readFileSync(templatePath, 'utf8');

    html = html.replace('{{nome}}', usuario.nome);
    html = html.replace('{{id_user}}', usuario.id_user);
    html = html.replace('{{email}}', usuario.email);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: '🚀 Bem-vindo(a) à TRUST!',
      html: html
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).send('Erro ao enviar e-mail.');
      } else {
        console.log('Email enviado: ' + info.response);
        return res.status(200).send('E-mail de boas-vindas enviado com sucesso.');
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).send('Erro no servidor.');
  }
};
const enviarAtivacao = async (req, res) => {
  try {
    const usuario = await User.findOne({ where: { email: req.body.email } });
    if (!usuario) {
      return res.status(404).send('E-mail não encontrado.');
    }

    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.PORTA,
      secure: process.env.SECURITY,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const templatePath = path.join(__dirname, '../template/approve.html');
    let html = fs.readFileSync(templatePath, 'utf8');

    html = html.replace('{{nome}}', usuario.nome);
    html = html.replace('{{id_user}}', usuario.id_user);
    html = html.replace('{{email}}', usuario.email);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: '✅ PARABÉNS - Conta ativada com sucesso!',
      html: html
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).send('Erro ao enviar e-mail.');
      } else {
        console.log('Email enviado: ' + info.response);
        return res.status(200).send('E-mail de ativação enviado com sucesso.');
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).send('Erro no servidor.');
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
  enviarAtivacao
};