const express = require('express');
const router = express.Router();
const {
  buscarVeiculoFipe,
  buscarVeiculoDados,
  buscarVeiculoLeilao,
  buscarVeiculoBinBaseEstadual,
} = require('../services/veiculos/index');

// Buscar informações FIPE de um veículo pela placa
router.post('/veiculo/fipe', async (req, res) => {
  try {
    const placa = req.body.placa;
    const resultado = await buscarVeiculoFipe(placa);
    res.json(resultado);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Buscar dados gerais de um veículo pela placa
router.post('/veiculo/dados', async (req, res) => {
  try {
    const placa = req.body.placa;
    const resultado = await buscarVeiculoDados(placa);
    res.json(resultado);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Buscar informações de leilão de um veículo pela placa
router.post('/veiculo/leilao', async (req, res) => {
  try {
    const placa = req.body.placa;
    const resultado = await buscarVeiculoLeilao(placa);
    res.json(resultado);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Buscar informações na base estadual de um veículo pela placa e UF
router.post('/veiculo/bin-base-estadual', async (req, res) => {
  try {
    const { placa, uf } = req.body;
    const resultado = await buscarVeiculoBinBaseEstadual(placa, uf);
    res.json(resultado);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


module.exports = router;
