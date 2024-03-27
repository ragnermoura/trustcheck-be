const express = require('express');
const router = express.Router();
const logsConsultasController = require('../controllers/logsConsultasController');

router.post('/logs-consultas', logsConsultasController.registrarConsulta);
router.get('/logs-consultas/usuario/:id_user', logsConsultasController.listarConsultasPorUsuario);
router.get('/', logsConsultasController.listarConsultas);

module.exports = router;
