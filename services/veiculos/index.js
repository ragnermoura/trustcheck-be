const axios = require('axios');
require('dotenv').config();

const buscarVeiculoFipe = async (placa) => {
    try {
        const urlApiBrasil = process.env.URL_API_BRASIL + "/vehicles/fipe";
        const tokenApiBrasil = process.env.TOKEN_API_BRASIL_PROFILE_1;
        const deviceToken = process.env.DEVICETOKEN_API_VEICULO_FIPE_PROD;

        const response = await axios.post(
            urlApiBrasil,
            { placa: placa },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenApiBrasil}`,
                    DeviceToken: deviceToken,
                    Accept: "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Erro na busca de veículo FIPE:', error);
        throw error;
    }
};
const buscarVeiculoDados = async (placa) => {
    try {
        const urlApiBrasil = process.env.URL_API_BRASIL + "/vehicles/dados";
        const tokenApiBrasil = process.env.TOKEN_API_BRASIL_PROFILE_1;
        const deviceToken = process.env.DEVICETOKEN_API_VEICULO_GERAL_PROD;

        const response = await axios.post(
            urlApiBrasil,
            { placa },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenApiBrasil}`,
                    DeviceToken: deviceToken,
                    Accept: "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Erro na busca de dados gerais do veículo:', error);
        throw error;
    }
};
const buscarVeiculoLeilao = async (placa) => {
    try {
        const urlApiBrasil = process.env.URL_API_BRASIL + "/leilao";
        const tokenApiBrasil = process.env.TOKEN_API_BRASIL_PROFILE_2;
        const deviceToken = process.env.DEVICETOKEN_API_VEICULO_LEILAO_PROD;

        const response = await axios.post(
            urlApiBrasil,
            { placa, leilao: "SIM" },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenApiBrasil}`,
                    DeviceToken: deviceToken,
                    Accept: "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Erro na busca de veículo em leilão:', error);
        throw error;
    }
};
const buscarVeiculoBinBaseEstadual = async (placa, uf) => {
    try {
        const urlApiBrasil = process.env.URL_API_BRASIL + "/binBaseEstadual";
        const tokenApiBrasil = process.env.TOKEN_API_BRASIL_PROFILE_2;
        const deviceToken = process.env.DEVICETOKEN_API_VEICULO_BIN_BASE_PROD;

        const response = await axios.post(
            urlApiBrasil,
            { placa, uf, binBaseEstadual: "SIM" },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenApiBrasil}`,
                    DeviceToken: deviceToken,
                    Accept: "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Erro na busca de veículo na base estadual:', error);
        throw error;
    }
};

module.exports = { buscarVeiculoFipe, buscarVeiculoDados, buscarVeiculoLeilao, buscarVeiculoBinBaseEstadual };

