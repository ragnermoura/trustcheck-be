const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Usuario = require("./tb_usuarios");

const Denuncia = conn.define(
  "tb_denuncia",
  {
    id_denuncia: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    placa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    renavam: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    regiao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    relato: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

Denuncia.belongsTo(Usuario, {
  foreignKey: "id_user",
  foreignKeyConstraint: true,
});

module.exports = Denuncia;
