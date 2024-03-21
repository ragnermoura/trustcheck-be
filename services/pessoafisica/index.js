const axios = require('axios');
const ConsultaCount = require('../../models/tb_consulta_count');
const Logsconsultas = require('../../models/tb_logs_consultas');
const Token = require('../../models/tb_token');

require('dotenv').config();

const buscarPessoaFisica = async (id_user, token, cpf) => {

    try {
      
        const tokenValido = await Token.findOne({ where: { id_user, token } });
        if (!tokenValido) {
            throw new Error('Token inválido ou expirado.');
        }

        const consultaCount = await ConsultaCount.findOne({ where: { id_user } });
        if (!consultaCount || consultaCount.consultas <= 0) {
            throw new Error('Falta de créditos para consulta Trust.');
        }

        await consultaCount.decrement('consultas');

        const response = await axios.post(
            `${process.env.URL_API_BRASIL}/dados/cpf`, 
            { cpf },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.TOKEN_API_BRASIL_PROFILE_1}`,
                    DeviceToken: process.env.DEVICETOKEN_API_CPF_HOMOLOG,
                    Accept: "application/json",
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                },
            }
        );

        await Logsconsultas.create({
            id_user,
            label_pesquisa: "Busca de Pessoa Física"
        });

        return response.data;
    } catch (error) {
        console.error('Erro na busca de pessoa física:', error);
        throw error;
    }
};

module.exports = { buscarPessoaFisica };

