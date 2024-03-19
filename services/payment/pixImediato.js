const EfiPay = require('sdk-node-apis-efi')
const options = require('./config.js')

const efipay = new EfiPay(options)

async function createCharge(dueSeconds, cpf, fullname, valor, plano) {

    let body = {
        calendario: {
            expiracao: dueSeconds,
        },
        devedor: {
            cpf: cpf.replace(/\D/g, ''),
            nome: fullname,
        },
        valor: {
            original: valor.toFixed(2),
        },
        chave: '831565f1-1b5c-4df3-89c8-81d8ec778930',
        infoAdicionais: [
            {
                nome: 'Trust Intelligent',
                valor: 'System',
            },
            {
                nome: 'Compra de Pacote',
                valor: plano,
            },
        ],
    }

    const response = await efipay.pixCreateImmediateCharge([], body);
    return response;

}

async function generateQRCode(locId) {
    let params = {
        id: locId
    }
    const response = await efipay.pixGenerateQRCode(params);
    return response;

}

async function pixStatus(txid) {
    let params = {
        txid: txid
    }
    const response = await efipay.pixDetailCharge(params);
    return response;

}

module.exports = { createCharge, generateQRCode, pixStatus };


