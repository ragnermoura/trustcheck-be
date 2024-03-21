const express = require('express');
const router = express.Router();
const {
  buscarPessoaFisica
} = require('../services/pessoafisica/index');


router.post("/pessoa-fisica", async (req, res) => {
  const { id_user, token, cpf } = req.body;
  try {
      const data = await buscarPessoaFisica(id_user, token, cpf);
      res.json(data);
  } catch (error) {
      console.error('Erro na rota de buscar pessoa física:', error);
      res.status(500).send({ error: error.message });
  }
});


module.exports = router;
