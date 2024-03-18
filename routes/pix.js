const express = require('express');
const pixPayment = require('../controllers/pixController');
const router = express.Router();

router.post("/pix", pixPayment.paymentPix);

module.exports = router;