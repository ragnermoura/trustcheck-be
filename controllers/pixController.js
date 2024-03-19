const { createCharge } = require('../services/payment/pixImediato');

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

module.exports = {
    paymentPix
};

