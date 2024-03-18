const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Pagamento = conn.define(
    "tb_pagamento",
    {
        id_pagamento: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_plano: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        valor: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        metodo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    },
    { freezeTableName: true }
);

Pagamento.belongsTo(Usuario, {
    foreignKey: "id_user",
    foreignKeyConstraint: true,
});

Pagamento.belongsTo(Plano, {
    foreignKey: "id_plano",
    foreignKeyConstraint: true,
});


module.exports = Pagamento;