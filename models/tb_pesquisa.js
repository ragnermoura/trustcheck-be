const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Usuario = require("./tb_usuarios");

const Pesquisa = conn.define(
    "tb_pesquisa",
    {
        id_pesquisa: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nome_completo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        data_nascimento: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nome_mae: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rg: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        razao_social: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cnpj: {
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
        ano: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        placa: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        chassi: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        renavam: {
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

Pesquisa.belongsTo(Usuario, {
    foreignKey: "id_user",
    foreignKeyConstraint: true,
});


module.exports = Pesquisa;