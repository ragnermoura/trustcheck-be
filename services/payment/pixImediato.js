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
                nome: 'Pagamento em',
                valor: 'Trust Intelligent System',
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

module.exports = { createCharge };


