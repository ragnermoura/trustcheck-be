const express = require("express");
const Acesso = require("../models/tb_acesso");
const path = require('path');
const fs = require("fs").promises;
const nodemailer = require("nodemailer");

require('dotenv').config()

const novoAcesso = async (req, res, next) => {
    try {
        const { latitude, longitude, regiao, plataforma, navegador, enderecoIp, id_user } = req.body;

        if (!latitude || !longitude || !regiao || !plataforma || !navegador || !enderecoIp || !id_user) {
            return res.status(400).send('Dados incompletos.');
        }

        // Verificando se já existe um acesso com a mesma plataforma ou endereço IP
        const acessoExistente = await Acesso.findOne({
            where: {
                [Sequelize.Op.or]: [{ plataforma: plataforma }, { enderecoIp: enderecoIp }]
            }
        });

        if (acessoExistente) {
            return res.status(409).send('Um acesso com essa plataforma ou endereço IP já existe.');
        }

        const novoAcesso = await Acesso.create({
            latitude,
            longitude,
            regiao,
            plataforma,
            navegador,
            enderecoIp,
            id_user
        });

        res.status(201).send({ mensagem: 'Acesso registrado com sucesso!', acesso: novoAcesso });
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao registrar o acesso.');
    }
};

const enviarEmailAcesso = async (req, res) => {
    const { email, nome, regiao, plataforma, navegador, enderecoIp } = req.body;
    try {
      const htmlFilePath = path.join(__dirname, '../template/acesso/index.html');
      let htmlContent = await fs.readFile(htmlFilePath, "utf8");
  
      htmlContent = htmlContent
      .replace("{{nome}}", nome)
      .replace("{{regiao}}", regiao)
      .replace("{{plataforma}}", plataforma)
      .replace("{{navegador}}", navegador)
      .replace("{{enderecoIp}}", enderecoIp);
  
      let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true, // true para porta 465, false para outras portas
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          ciphers: "SSLv3",
        },
      });
  
  
      let mailOptions = {
        from: `"Segurança Trust" ${process.env.EMAIL_FROM}`,
        to: email,
        subject: "🚨 Detectamos um novo acesso...",
        html: htmlContent, // Usa o HTML modificado como corpo do email
      };
  
      let info = await transporter.sendMail(mailOptions);
      console.log("Mensagem enviada: %s", info.messageId);
      res.send("Email enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar email: ", error);
      res.send("Erro ao enviar email.");
    }
};


module.exports = {
    novoAcesso,
    enviarEmailAcesso
};
