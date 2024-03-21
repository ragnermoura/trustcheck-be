const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Usuario = require("./tb_usuarios");

const Logsconsultas = conn.define(
    "tb_logs_consultas",
    {
        id_logconsulta: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        label_pesquisa: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    },
    { freezeTableName: true }
);

Logsconsultas.belongsTo(Usuario, {
    foreignKey: "id_user",
    foreignKeyConstraint: true,
});


module.exports = Logsconsultas;