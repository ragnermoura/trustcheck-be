const axios = require('axios');
require('dotenv').config();

const buscarPessoaFisica = async (cpf) => {
    try {
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

        return response.data;
    } catch (error) {
        console.error('Erro na busca de pessoa física:', error);
        throw error;
    }
};

module.exports = { buscarPessoaFisica };

