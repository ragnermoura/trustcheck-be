const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Usuario = require("./tb_usuarios");

const Perfil = conn.define("tb_perfil", {
    id_perfil: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    razao_social: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefone2: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    aniversario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tem_cnpj: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    termos: {
        type: DataTypes.STRING,
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