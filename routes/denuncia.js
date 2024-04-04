const express = require('express');
const router = express.Router();
const denunciaController = require('../controllers/denunciaController');

router.post('/denuncia', denunciaController.createDenuncia);
router.get('/', denunciaController.getAllDenuncias);
router.get('/:id_denuncia', denunciaController.getDenunciaById);
router.put('/edit/:id_denuncia', denunciaController.updateDenuncia);
router.delete('/delete/:id_denuncia', denunciaController.deleteDenuncia);

module.exports = router;
