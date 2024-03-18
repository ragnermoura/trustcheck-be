const axios = require('axios');
require('dotenv').config();

// Configuração inicial
const urlApiBrasil = process.env.URL_API_BRASIL;
const tokenApiBrasil = process.env.TOKEN_API_BRASIL_PROFILE_1;
const deviceTokenCnpjProd = process.env.DEVICETOKEN_API_CNPJ_PROD;

const buscarCnpj = async (cnpj) => {
    const response = await axios.post(
        `${urlApiBrasil}/cnpj`, 
        { cnpj },
        { headers: configHeaders() }
    );
    return response.data;
};
const buscarCnae = async (dados) => {
    const response = await axios.post(`${urlApiBrasil}/cnae`, {
        cnae: dados.cnae,
        quantidade: dados.quantidade,
        uf: dados.uf,
        municipio: dados.municipio,
    }, { headers: configHeaders() });
    return response.data;
};
const buscarUf = async (dados) => {
    const response = await axios.post(`${urlApiBrasil}/uf`, {
        uf: dados.uf,
        quantidade: dados.quantidade,
    }, { headers: configHeaders() });
    return response.data;
};
const buscarDataAbertura = async (dados) => {
    const response = await axios.post(`${urlApiBrasil}/data-abertura`, {
        data_abertura: dados.data_abertura,
        cnae: dados.cnae,
        uf: dados.uf,
        municipio: dados.municipio,
        quantidade: dados.quantidade,
    }, { headers: configHeaders() });
    return response.data;
};
const buscarCapitalSocial = async (dados) => {
    const response = await axios.post(`${urlApiBrasil}/capital-social`, {
        capital_social_inicio: dados.capital_social_inicio,
        capital_social_fim: dados.capital_social_fim,
        quantidade: dados.quantidade,
        cnae: dados.cnae,
        uf: dados.uf,
        municipio: dados.municipio,
    }, { headers: configHeaders() });
    return response.data;
};
const buscarCep = async (dados) => {
    const response = await axios.post(`${urlApiBrasil}/cep`, {
        cep: dados.cep,
        quantidade: dados.quantidade,
    }, { headers: configHeaders() });
    return response.data;
};
const buscarListaSocios = async (dados) => {
    const response = await axios.post(`${urlApiBrasil}/lista-socios`, {
        quantidade: dados.quantidade,
    }, { headers: configHeaders() });
    return response.data;
};

// Configuração dos headers
const configHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${tokenApiBrasil}`,
    DeviceToken: deviceTokenCnpjProd,
    Accept: "application/json",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
});

module.exports = {
    buscarCnpj,
    buscarCnae,
    buscarUf,
    buscarDataAbertura,
    buscarCapitalSocial,
    buscarCep,
    buscarListaSocios,
};
