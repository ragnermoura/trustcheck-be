const axios = require('axios');
require('dotenv').config();
const ConsultaCount = require('../../models/tb_consulta_count');
const Logsconsultas = require('../../models/tb_logs_consultas');
const Token = require('../../models/tb_token');

const buscarVeiculoFipe = async (id_user, token, placa) => {
    try {
        const tokenValido = await Token.findOne({ where: { id_user, token } });
        if (!tokenValido) {
            throw new Error('Token inválido ou expirado.');
        }

        const consultaCount = await ConsultaCount.findOne({ where: { id_user } });
        if (!consultaCount || consultaCount.consultas <= 0) {
            throw new Error('Falta de créditos para consulta Trust.');
        }

        // Reduzir a contagem de consultas em -1
        await consultaCount.decrement('consultas');

        // Realizar a consulta à API externa
        const urlApiBrasil = process.env.URL_API_BRASIL + "/vehicles/fipe";
        const tokenApiBrasil = process.env.TOKEN_API_BRASIL_PROFILE_1;
        const deviceToken = process.env.DEVICETOKEN_API_VEICULO_FIPE_PROD;

        const response = await axios.post(urlApiBrasil, { placa: placa }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenApiBrasil}`,
                DeviceToken: deviceToken,
                Accept: "application/json",
            },
        });

        await Logsconsultas.create({
            id_user,
            label_pesquisa: "Busca FIPE"
        });

        return response.data;
    } catch (error) {
        console.error('Erro na consulta:', error.message || error);
        throw error;
    }
};
const buscarVeiculoDados = async (id_user, token, placa) => {
    try {
    
        const tokenValido = await Token.findOne({ where: { id_user, token } });
        if (!tokenValido) {
            throw new Error('Token inválido ou expirado.');
        }

        const consultaCount = await ConsultaCount.findOne({ where: { id_user } });
        if (!consultaCount || consultaCount.consultas <= 0) {
            throw new Error('Falta de créditos para consulta Trust.');
        }

        // Reduzir a contagem de consultas em -1
        await consultaCount.decrement('consultas');

        // Realizar a consulta à API externa
        const urlApiBrasil = process.env.URL_API_BRASIL + "/vehicles/dados";
        const tokenApiBrasil = process.env.TOKEN_API_BRASIL_PROFILE_1;
        const deviceToken = process.env.DEVICETOKEN_API_VEICULO_GERAL_PROD;

        const response = await axios.post(urlApiBrasil, { placa }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenApiBrasil}`,
                DeviceToken: deviceToken,
                Accept: "application/json",
            },
        });

        // Registrar a consulta no log
        await Logsconsultas.create({
            id_user,
            label_pesquisa: "Busca Geral de Veículo"
        });

        return response.data;
    } catch (error) {
        console.error('Erro na busca de dados gerais do veículo:', error);
        throw error;
    }
};
const buscarVeiculoLeilao = async (id_user, token, placa) => {
    try {
        // Verificar a validade do token
        const tokenValido = await Token.findOne({ where: { id_user, token } });
        if (!tokenValido) {
            throw new Error('Token inválido ou expirado.');
        }

        // Verificar a quantidade de consultas disponíveis
        const consultaCount = await ConsultaCount.findOne({ where: { id_user } });
        if (!consultaCount || consultaCount.consultas <= 0) {
            throw new Error('Falta de créditos para consulta Trust.');
        }

        // Reduzir a contagem de consultas em -1
        await consultaCount.decrement('consultas');

        // Realizar a consulta à API externa
        const urlApiBrasil = process.env.URL_API_BRASIL + "/vehicles/leilao";
        const tokenApiBrasil = process.env.TOKEN_API_BRASIL_PROFILE_2;
        const deviceToken = process.env.DEVICETOKEN_API_VEICULO_LEILAO_HOMOLOG;

        const response = await axios.post(urlApiBrasil, { placa, leilao: "SIM" }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenApiBrasil}`,
                DeviceToken: deviceToken,
                Accept: "application/json",
            },
        });

        // Registrar a consulta no log
        await Logsconsultas.create({
            id_user,
            label_pesquisa: "Busca de Veículo Leilão"
        });

        return response.data;
    } catch (error) {
        console.error('Erro na busca de veículo em leilão:', error);
        throw error;
    }
};
const buscarVeiculoBinBaseEstadual = async (id_user, token, placa, uf) => {
    try {
        // Verificar a validade do token
        const tokenValido = await Token.findOne({ where: { id_user, token } });
        if (!tokenValido) {
            throw new Error('Token inválido ou expirado.');
        }

        // Verificar a quantidade de consultas disponíveis
        const consultaCount = await ConsultaCount.findOne({ where: { id_user } });
        if (!consultaCount || consultaCount.consultas <= 0) {
            throw new Error('Falta de créditos para consulta Trust.');
        }

        // Reduzir a contagem de consultas em -1
        await consultaCount.decrement('consultas');

        // Realizar a consulta à API externa
        const urlApiBrasil = process.env.URL_API_BRASIL + "/vehicles/binBaseEstadual";
        const tokenApiBrasil = process.env.TOKEN_API_BRASIL_PROFILE_2;
        const deviceToken = process.env.DEVICETOKEN_API_VEICULO_BIN_BASE_HOMOLOG;

        const response = await axios.post(urlApiBrasil, { placa, uf, binBaseEstadual: "SIM" }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenApiBrasil}`,
                DeviceToken: deviceToken,
                Accept: "application/json",
            },
        });

        // Registrar a consulta no log
        await Logsconsultas.create({
            id_user,
            label_pesquisa: "Busca Base Estadual"
        });

        return response.data;
    } catch (error) {
        console.error('Erro na busca de veículo na base estadual:', error);
        throw error;
    }
};

module.exports = { buscarVeiculoFipe, buscarVeiculoDados, buscarVeiculoLeilao, buscarVeiculoBinBaseEstadual };

