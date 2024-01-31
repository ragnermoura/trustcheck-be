const express = require("express");
const Acesso = require("../models/tb_acesso");
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

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

const enviarEmailAcesso = async (acesso, emailUsuario) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: process.env.PORTA,
            secure: process.env.SECURITY,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const templatePath = path.join(__dirname, '../template/access.html');
        let html = fs.readFileSync(templatePath, 'utf8');

        html = html.replace('{{nome}}', acesso.nome);
        html = html.replace('{{regiao}}', acesso.regiao);
        html = html.replace('{{plataforma}}', acesso.plataforma);
        html = html.replace('{{navegador}}', acesso.navegador);
        html = html.replace('{{enderecoip}}', acesso.enderecoIp);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: emailUsuario,
            subject: '🚨 Alerta de Novo Acesso!',
            html: html
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return { success: false, message: 'Erro ao enviar e-mail.' };
            } else {
                console.log('Email enviado: ' + info.response);
                return { success: true, message: 'E-mail de alerta de acesso enviado com sucesso.' };
            }
        });
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Erro no servidor.' };
    }
};

module.exports = {
    novoAcesso,
    enviarEmailAcesso
};
