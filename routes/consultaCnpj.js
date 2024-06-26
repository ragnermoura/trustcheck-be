const express = require('express');
const router = express.Router();
const {
    buscarCnpj,
    buscarCnae,
    buscarCnaeDetalhes,
    buscarUf,
    buscarDataAbertura,
    buscarCapitalSocial,
    buscarCep,
    buscarListaSocios,
} = require('../services/empresa/index');


router.post('/cnpj', async (req, res) => {
    try {
        const { id_user, token, cnpj } = req.body;
        const resultado = await buscarCnpj(id_user, token, cnpj);
        res.json(resultado);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.post('/cnae', async (req, res) => {
  
    try {
        const { id_user, token, dados } = req.body;
        const resultado = await buscarCnae( id_user, token, dados);
        res.json(resultado);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.post('/detalhes/cnae', async (req, res) => {
  
    try {
        const { id_user, token, cnae, quantidade, uf, municipio } = req.body;
        const resultado = await buscarCnaeDetalhes( id_user, token, cnae, quantidade, uf, municipio);
        res.json(resultado);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Rota para buscar por UF
router.post('/uf', async (req, res) => {
    try {
        const dados = req.body;
        const resultado = await buscarUf(dados);
        res.json(resultado);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Rota para buscar por data de abertura
router.post('/data-abertura', async (req, res) => {
    try {
        const dados = req.body;
        const resultado = await buscarDataAbertura(dados);
        res.json(resultado);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Rota para buscar por capital social
router.post('/capital-social', async (req, res) => {
    try {
        const { inicial, final, id_user, token, cnae, quantidade, uf, municipio } = req.body;

        const resultado = await buscarCapitalSocial(inicial, final, id_user, token, cnae, quantidade, uf, municipio);
        res.json(resultado);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Rota para buscar por CEP
router.post('/cep', async (req, res) => {
    try {
        const dados = req.body;
        const resultado = await buscarCep(dados);
        res.json(resultado);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Rota para buscar lista de sócios
router.post('/lista-socios', async (req, res) => {
    try {
        const { id_user, token, cnpj } = req.body;
        const resultado = await buscarListaSocios(id_user, token, cnpj);
        res.json(resultado);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;
