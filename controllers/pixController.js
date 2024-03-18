const { createCharge, generateQRCode } = require('../services/payment/pixImediato');



async function paymentPix(req, res, next) {
    const dueSeconds = 3600;
    const cpf = req.body.cpf;
    const fullname = req.body.fullname;
    const valor = req.body.valor;
    const plano = req.body.plano;

    try {
        const response = await createCharge(dueSeconds, cpf, fullname, valor, plano);

        if (response && response.loc.id) {
            const locId = response.loc.id;

            const qrCodeData = await generateQRCode(locId);

            return res.status(200).send(qrCodeData);
        } else {

            return res.status(400).send({ error: "ID da operação não encontrado na resposta" });
        }


    } catch (error) {
        console.error("Erro ao criar cobrança:", error);
    }
}



module.exports = {
    paymentPix
};

