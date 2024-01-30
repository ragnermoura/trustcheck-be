const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");


const Plano = conn.define("tb006_plano", {
    id_plano: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome_plano: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    valor_plano: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}, { freezeTableName: true });



module.exports = Plano;