const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Usuario = require("./tb_usuarios");

const Documento = conn.define(
    "tb_documentos",
    {
        id_documento: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        rg: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cnpj: {
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

Logs.belongsTo(Usuario, {
    foreignKey: "id_user",
    foreignKeyConstraint: true,
});


module.exports = Documento;