const express = require("express");
const Acesso = require("../models/tb_acesso");
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
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

// const enviarEmailAcesso = async (acesso, email) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             pool: true,
//             host: "mail.trustsystemalert.com.br",
//             port: 465,  
//             secure: true,
//             auth: {
//                 user: "noreply@trustsystemalert.com.br",
//                 pass: "p(,;WM5dIY4b"
//             },
//             tls: {
//                 rejectUnauthorized: false,
//             },

//         });

//         const templatePath = path.join(__dirname, "../template/access.html");
//         let html = fs.readFileSync(templatePath, 'utf8');

//         html = html.replace('{{nome}}', acesso.nome);
//         html = html.replace('{{regiao}}', acesso.regiao);
//         html = html.replace('{{plataforma}}', acesso.plataforma);
//         html = html.replace('{{navegador}}', acesso.navegador);
//         html = html.replace('{{enderecoip}}', acesso.enderecoIp);

//         const mailOptions = {
//             from: "noreply@trustsystemalert.com.br",
//             to: 'ragnermoura@gmail.com',
//             subject: '🚨 Alerta de Novo Acesso!',
//             html: html
//         };

//         const info = await transporter.sendMail(mailOptions);

//         console.log('Email enviado: ' + info.response);
//         return { success: true, message: 'E-mail de alerta de acesso enviado com sucesso.' };
//     } catch (error) {
//         console.log(error);
//         return { success: false, message: 'Erro ao enviar e-mail.' };
//     }
// };

const enviarEmailAcesso = async (req, res) => {
    try {

        const { nome, regiao, plataforma, navegador, enderecoIp, email } = req.body;

        const transporter = nodemailer.createTransport({
            name: process.env.NAME,
            host: process.env.HOST,
            service: process.env.HOST,
            port: process.env.PORTA,
            secure: process.env.SECURITY,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.SENHA
            },
            tls: {
                rejectUnauthorized: false,
            },

        });

        const templatePath = path.join(__dirname, "../template/access.html");
        let html = fs.readFileSync(templatePath, 'utf8');

        html = html.replace('{{nome}}', nome);
        html = html.replace('{{regiao}}', regiao);
        html = html.replace('{{plataforma}}', plataforma);
        html = html.replace('{{navegador}}', navegador);
        html = html.replace('{{enderecoip}}', enderecoIp);


        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: '🚨 Alerta de Novo Acesso!',
            html: html
        };

        const info = await transporter.sendMail(mailOptions);

        console.log('Email enviado: ' + info.response);
        res.status(200).json({ success: true, message: 'E-mail de alerta de acesso enviado com sucesso para o destinatário:' + email });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Erro ao enviar e-mail.' });
    }
};


module.exports = {
    novoAcesso,
    enviarEmailAcesso
};
