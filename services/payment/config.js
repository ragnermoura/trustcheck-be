const EfiPay = require('sdk-node-apis-efi')
// const certificado = require('../../certificate/homologacao-548331-trustPlataformHomolog.p12')
require('dotenv').config();

module.exports = {
    sandbox: true,
    client_id: process.env.CLIENT_ID_HOMOLOG,
    client_secret: process.env.CLIENT_SECRET_HOMOLOG,
	pix_cert: __dirname + '/homologacao-548331-trustPlataformHomolog.p12',
}
