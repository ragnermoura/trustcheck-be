const bcrypt = require('bcrypt');
const User = require('../models/tb_usuarios');

const alterarSenha = async (req, res) => {
  try {
    const { email, novaSenha } = req.body;

    const usuario = await User.findOne({
      where: { email: email }
    });

    if (!usuario) {
      return res.status(404).send({ mensagem: "Usuário não encontrado." });
    }

    const hashedPassword = await bcrypt.hash(novaSenha, 10);

    await usuario.update({ senha: hashedPassword });

    res.status(200).send({ mensagem: "Senha atualizada com sucesso!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
const enviarAlteraSenha = async (req, res) => {
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

        const templatePath = path.join(__dirname, '../template/recovery.html');
        let html = fs.readFileSync(templatePath, 'utf8');


        html = html.replace('{{nome}}', acesso.nome);
        html = html.replace('{{regiao}}', acesso.regiao);
        html = html.replace('{{plataforma}}', acesso.plataforma);
        html = html.replace('{{navegador}}', acesso.navegador);
        html = html.replace('{{enderecoip}}', acesso.enderecoIp);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: emailUsuario,
            subject: '👀 Sua senha foi trocada!',
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
  alterarSenha,
  enviarAlteraSenha
};
