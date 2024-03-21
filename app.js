const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')


require('dotenv').config();

const Plano = require('./models/tb_plano');
const ItemPlano = require('./models/tb_plano_item');
const Perfil = require('./models/tb_perfil');
const Usuarios = require('./models/tb_usuarios');

const rotaAcesso = require('./routes/access');
const rotaLog = require('./routes/log');
const rotaLogconsulta = require('./routes/logconsulta');
const rotaLogin = require('./routes/login');
const rotaNivel = require('./routes/nivel');
const rotaPerfil = require('./routes/perfil');
const rotaPesquisar = require('./routes/pesquisar');
const rotaPlano = require('./routes/plano');
const rotaRecovery = require('./routes/recovery');
const rotaStatus = require('./routes/status');
const rotaToken = require('./routes/token');
const rotaUsuarios = require('./routes/usuario');
const rotaConsulta = require('./routes/consultas');
const rotaVeiculo = require('./routes/consultaVeiculo');
const rotaPessoaFisica = require('./routes/consultaPessoaFisica');
const rotaEmpresa = require('./routes/consultaCnpj');
const rotaPagamentoPix = require('./routes/pix');
const rotaFinanceiro = require('./routes/pagamento');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Credentials", "true")
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, OPTIONS')
        return res.status(200).send({})
    }
    next();
})

app.use('/acesso', rotaAcesso);
app.use('/log', rotaLog);
app.use('/logconsulta', rotaLogconsulta);
app.use('/auth', rotaLogin);
app.use('/nivel', rotaNivel);
app.use('/perfil', rotaPerfil);
app.use('/pesquisar', rotaPesquisar);
app.use('/plano', rotaPlano);
app.use('/recovery', rotaRecovery);
app.use('/status', rotaStatus);
app.use('/token', rotaToken);
app.use('/usuarios', rotaUsuarios);
app.use('/consulta', rotaConsulta);
app.use('/buscar', rotaVeiculo);
app.use('/buscar-cpf', rotaPessoaFisica);
app.use('/buscar-empresa', rotaEmpresa);
app.use('/pagamento', rotaPagamentoPix);
app.use('/financeiro', rotaFinanceiro);


app.get('/api/test', (req, res) => {
    res.status(200).json({ message: 'OK' })
})

app.use(express.static('public'))

app.use((req, res, next) => {
    const erro = new Error('Rota não encontrada');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            mensagem: error.mensagem
        }
    })
});


Plano.hasMany(ItemPlano, {
    foreignKey: 'id_plano',
    as: 'itensPlano'
});

ItemPlano.belongsTo(Plano, {
    foreignKey: 'id_plano',
    as: 'Plano'
});

Usuarios.hasMany(Perfil, {
    foreignKey: 'id_user',
    as: 'Perfil'
});

Perfil.belongsTo(Usuarios, {
    foreignKey: 'id_user',
    as: 'Usuario'
});

module.exports = app;