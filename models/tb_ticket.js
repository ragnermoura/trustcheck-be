const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Usuario = require("./tb_usuarios");

const Ticket = conn.define(
    "tb_ticket",
    {
        id_ticket: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        assunto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        desricao: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        resposta: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        file: {
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

Ticket.belongsTo(Usuario, {
    foreignKey: "id_user",
    foreignKeyConstraint: true,
});

module.exports = Ticket;