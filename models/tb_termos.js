const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Termos = conn.define(
  "tb_termos",
  {
    id_termo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    texto: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },
  { freezeTableName: true }
);

module.exports = Termos;