const express = require('express');
const router = express.Router();
const {
  buscarPessoaFisica
} = require('../services/pessoafisica/index');


router.post('/pessoa-fisica', async (req, res) => {
  try {
    const cpf = req.body.cpf;
    const resultado = await buscarPessoaFisica(cpf);
    res.json(resultado);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
