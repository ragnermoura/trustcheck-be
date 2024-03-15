const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Plano = require("./tb_plano");

const ItemPlano = conn.define("tb_item_plano", {
    id_item: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    item: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_plano: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

}, { freezeTableName: true });

ItemPlano.belongsTo(Plano, {
    foreignKey: "id_plano",
    foreignKeyConstraint: true,
  });

module.exports = ItemPlano;