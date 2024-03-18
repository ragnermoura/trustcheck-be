const express = require('express');
const pixPayment = require('../services/payment/pixImediato');
const router = express.Router();


router.post("/pix", pixPayment.createCharge);

module.exports = router;