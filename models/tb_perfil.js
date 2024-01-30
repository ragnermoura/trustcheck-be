const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Usuario = require("./tb_usuarios");

const Perfil = conn.define("tb002_perfil", {
    id_perfil: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    razao_social: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pdf_rg: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pdf_cnpj: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tem_cnpj: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },


}, { freezeTableName: true });


Perfil.belongsTo(Usuario, {
    foreignKey: "id_user",
    foreignKeyConstraint: true,
});



module.exports = Perfil;