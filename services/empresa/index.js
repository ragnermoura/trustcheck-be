const axios = require('axios');
const ConsultaCount = require('../../models/tb_consulta_count');
const Logsconsultas = require('../../models/tb_logs_consultas');
const Token = require('../../models/tb_token');

require('dotenv').config();

const buscarCnpj = async (id_user, token, cnpj) => {
    try {
        // Verificar a validade do token
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
        const urlApiBrasil = process.env.URL_API_BRASIL;
        const tokenApiBrasil = process.env.TOKEN_API_BRASIL_PROFILE_1;
        const deviceToken = process.env.DEVICETOKEN_API_CNPJ_PROD;

        const response = await axios.post(`${urlApiBrasil}/cnpj`, { cnpj }, {
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
            label_pesquisa: "Busca CNPJ"
        });

        return response.data;
    } catch (error) {
        console.error('Erro na busca CNPJ:', error);
        throw error;
    }
};
const buscarCnae = async (id_user, token, dados) => {
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
        const urlApiBrasil = process.env.URL_API_BRASIL;
        const tokenApiBrasil = process.env.TOKEN_API_BRASIL_PROFILE_1;
        const deviceToken = process.env.DEVICETOKEN_API_CNPJ_PROD;

        const response = await axios.post(`${urlApiBrasil}/cnae`, {
            cnae: dados.cnae,
            quantidade: dados.quantidade,
            uf: dados.uf,
            municipio: dados.municipio,
        }, {
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
            label_pesquisa: "Busca CNAE"
        });

        return response.data;
    } catch (error) {
        console.error('Erro na busca CNAE:', error);
        throw error;
    }
};
const buscarUf = async (dados) => {
    const response = await axios.post(`${urlApiBrasil}/uf`, {
        uf: dados.uf,
        quantidade: dados.quantidade,
    }, { headers: configHeaders() });
    return response.data;
};
const buscarDataAbertura = async (id_user, token, dados) => {
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
        const urlApiBrasil = process.env.URL_API_BRASIL;
        const response = await axios.post(`${urlApiBrasil}/data-abertura`, {
            data_abertura: dados.data_abertura,
            cnae: dados.cnae,
            uf: dados.uf,
            municipio: dados.municipio,
            quantidade: dados.quantidade,
        }, { 
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.TOKEN_API_BRASIL_PROFILE_1}`,
                DeviceToken: DEVICETOKEN_API_CNPJ_PROD,
                Accept: "application/json",
            }
        });

        // Registrar a consulta no log
        await Logsconsultas.create({
            id_user,
            label_pesquisa: "Busca por Data de Abertura"
        });

        return response.data;
    } catch (error) {
        console.error('Erro na busca por Data de Abertura:', error);
        throw error;
    }
};
const buscarCapitalSocial = async (id_user, token, dados) => {
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
        const urlApiBrasil = process.env.URL_API_BRASIL;
        const response = await axios.post(`${urlApiBrasil}/capital-social`, {
            capital_social_inicio: dados.capital_social_inicio,
            capital_social_fim: dados.capital_social_fim,
            quantidade: dados.quantidade,
            cnae: dados.cnae,
            uf: dados.uf,
            municipio: dados.municipio,
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.TOKEN_API_BRASIL_PROFILE_1}`,
                DeviceToken: DEVICETOKEN_API_CNPJ_PROD,
                Accept: "application/json",
            },
        });

        // Registrar a consulta no log
        await Logsconsultas.create({
            id_user,
            label_pesquisa: "Busca por Capital Social"
        });

        return response.data;
    } catch (error) {
        console.error('Erro na busca por Capital Social:', error);
        throw error;
    }
};
const buscarCep = async (dados) => {
    const response = await axios.post(`${urlApiBrasil}/cep`, {
        cep: dados.cep,
        quantidade: dados.quantidade,
    }, { headers: configHeaders() });
    return response.data;
};
const buscarListaSocios = async (id_user, token, dados) => {
    try {
        // Verificar a validade do token
        const tokenValido = await Token.findOne({ where: { id_user, token } });
        if (!tokenValido) {
            throw new Error('Token inválido ou expirado.');
        }

        // Verificar créditos do usuário
        const consultaCount = await ConsultaCount.findOne({ where: { id_user } });
        if (!consultaCount || consultaCount.consultas <= 0) {
            throw new Error('Falta de créditos para consulta Trust.');
        }

        // Reduzir a contagem de consultas em -1
        await consultaCount.decrement('consultas');

        // Realizar a consulta à API externa
        const urlApiBrasil = process.env.URL_API_BRASIL;
        const tokenApiBrasil = process.env.TOKEN_API_BRASIL_PROFILE_1;
        const deviceToken = process.env.DEVICETOKEN_API_CNPJ_PROD;

        const response = await axios.post(`${urlApiBrasil}/lista-socios`, {
            quantidade: dados.quantidade,
        }, {
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
            label_pesquisa: "Busca Lista de Sócios"
        });

        return response.data;
    } catch (error) {
        console.error('Erro na busca Lista de Sócios:', error);
        throw error;
    }
};

module.exports = {
    buscarCnpj,
    buscarCnae,
    buscarUf,
    buscarDataAbertura,
    buscarCapitalSocial,
    buscarCep,
    buscarListaSocios,
};
