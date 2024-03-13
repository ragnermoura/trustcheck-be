const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");


const Plano = conn.define("tb_plano", {
    id_plano: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    titulo_plano: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subtitulo_plano: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    valor_plano_consulta: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dias_free: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    valor_plano_mes: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tag: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}, { freezeTableName: true });



module.exports = Plano;