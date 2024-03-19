const express = require('express');
const pixPayment = require('../controllers/pixController');
const router = express.Router();

router.post("/pix", pixPayment.paymentPix);
router.get("/gerar-qrcode/:locId", pixPayment.paymentPixGenerateQRCode);
router.get("/conferir/:txid", pixPayment.paymentPixStatus);

module.exports = router;