
const Perfil = require("../models/tb_perfil");

const path = require('path');
const fs = require("fs").promises;
const nodemailer = require("nodemailer");

require('dotenv').config();

const obterPerfil = async (req, res, next) => {
    try {
        const perfil = await Perfil.findAll();
        return res.status(200).send({ response: perfil });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};
const obterPerfilPorId = async (req, res, next) => {
    try {
        const perfil = await Perfil.findByPk(req.params.id_perfil);
        if (!perfil) {
            return res.status(404).send({ message: "Perfil do usuário não encontrado" });
        }
        return res.status(200).send({ response: perfil });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};
const atualizarPerfil = async (req, res, next) => {
    try {
        const perfil = await Perfil.findByPk(req.body.id_perfil);
        if (!perfil) {
            return res.status(404).send({ message: "Perfil não encontrado" });
        }
        perfil.razao_social = req.body.razao_social;
        perfil.cnpj = req.body.cnpj;
        perfil.cpf = req.body.cpf;
        perfil.telefone = req.body.telefone;
        perfil.cep = req.body.cep;
        perfil.endereco = req.body.endereco;
        await perfil.save();
        return res
            .status(201)
            .send({ mensagem: "Dados do perfil alterados com sucesso!" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};
const excluirPerfil = async (req, res, next) => {
    try {
        const perfil = await Perfil.findByPk(req.body.id_perfil);
        if (!perfil) {
            return res.status(404).send({ message: "Perfil não encontrado" });
        }
        await perfil.destroy();
        return res.status(202).send({ mensagem: "Perfil excluído com sucesso!" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};
const cadastrarPerfil = async (req, res, next) => {
    try {
        const perfilExistente = await Perfil.findOne({
            where: { cnpj: req.body.cnpj },
        });
        if (perfilExistente) {
            return res
                .status(409)
                .send({
                    mensagem: "Cnpj já cadastrado, por favor insira um CNPJ diferente!",
                });
        }
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
            id_user: req.body.id_user,
        });
        const response = {
            mensagem: "Usuário cadastrado com sucesso",
            perfilCriado: {
                id_perfil: novoperfil.id_perfil,
                razao_social: novoperfil.razao_social,
                cnpj: novoperfil.cnpj,
                id_user: novoperfil.id_user,
                request: {
                    tipo: "GET",
                    descricao: "Pesquisar um usuário",
                    url: `https://trustchecker.com.br/api/perfil/${novoperfil.id_perfil}`,
                },
            },
        };

        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};
const uploadRg = async (req, res) => {

    const { id_perfil } = req.params;
    const { filename } = req.file;

    const update = {
        pdf_rg: `/documentos/${filename}`
    }

    try {

        await Perfil.update(update, {
            where: {
                id_perfil
            }
        }
        )

        return res.status(201).json({
            success: true,
            mensagem: 'Pdf do RG cadastrado com sucesso!',
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Ocorreu um erro'
        })
    }
};
const getRg = async (req, res) => {

    try {

        const { id_perfil } = req.params

        const pdf_rg = await Perfil.findOne({
            where: { id_perfil },
            attributes: ['pdf_rg']
        })

        res.status(200).json({
            success: true,
            message: 'Sucesso',
            pdf_rg
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Ocorreu um erro'
        })
    }

};
const uploadCnpj = async (req, res) => {

    const { id_perfil } = req.params

    const { filename } = req.file

    const update = {
        pdf_cnpj: `/documentos/${filename}`
    }

    try {

        await Perfil.update(update, {
            where: {
                id_perfil
            }
        }
        )

        return res.status(201).json({
            success: true,
            mensagem: 'Pdf do CNPJ cadastrado com sucesso!',
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Ocorreu um erro'
        })
    }
};
const getCnpj = async (req, res) => {

    try {

        const { id_perfil } = req.params

        const pdf_cnpj = await Perfil.findOne({
            where: { id_perfil },
            attributes: ['pdf_cnpj']
        })

        res.status(200).json({
            success: true,
            message: 'Sucesso',
            pdf_cnpj
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Ocorreu um erro'
        })
    }

};

const enviarAlertDoc = async (req, res) => {
    const { email } = req.body;
    const nome = 'Humberto'
    try {
      const htmlFilePath = path.join(__dirname, '../template/alerts/documentos.html');
      let htmlContent = await fs.readFile(htmlFilePath, "utf8");
  
      htmlContent = htmlContent
        .replace("{{nome}}", nome)
        .replace("{{emailclient}}", email)
  
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
        to: 'humberto@trustsystemalert.com.br',
        subject: "✅ Novos doumentos enviados...",
        html: htmlContent, // Usa o HTML modificado como corpo do email
      };
  
      //       // Envia o email
      let info = await transporter.sendMail(mailOptions);
      console.log("Mensagem enviada: %s", info.messageId);
      res.send("Email enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar email: ", error);
      res.send("Erro ao enviar email.");
    }
  };

module.exports = {
    obterPerfil,
    obterPerfilPorId,
    atualizarPerfil,
    excluirPerfil,
    cadastrarPerfil,
    uploadRg,
    getRg,
    uploadCnpj,
    getCnpj,
    enviarAlertDoc
};