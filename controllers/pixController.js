const { createCharge, generateQRCode, pixStatus } = require('../services/payment/pixImediato');

async function paymentPix(req, res, next) {
    const dueSeconds = 3600;
    const cpf = req.body.cpf;
    const fullname = req.body.fullname;
    const valor = req.body.valor;
    const plano = req.body.plano;

    try {
        const response = await createCharge(dueSeconds, cpf, fullname, valor, plano);

        return res.status(200).send(response);

    } catch (error) {
        console.error("Erro ao criar cobrança:", error);
    }
}

async function paymentPixGenerateQRCode(req, res, next) {
    const locId = req.params.locId;
    try {
        const qrCodeData = await generateQRCode(locId);
        return res.status(200).send(qrCodeData);
    } catch (error) {
        console.error("Erro ao gerar QR Code:", error);
        return res.status(500).send({ error: "Erro ao gerar QR Code" });
    }
}

async function paymentPixStatus(req, res, next) {
    const txid = req.params.txid;
    try {
        const qrCodeData = await pixStatus(txid);
        return res.status(200).send(qrCodeData);
    } catch (error) {
        console.error("Erro ao gerar QR Code:", error);
        return res.status(500).send({ error: "Erro ao gerar QR Code" });
    }
}

module.exports = {
    paymentPix,
    paymentPixGenerateQRCode,
    paymentPixStatus
};

