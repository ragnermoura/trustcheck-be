const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Nivel = require("./tb_nivel");
const Status = require("./tb_status");
const Plano = require("./tb_plano");

const Usuario = conn.define("tb001_usuario", {
  id_user: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sobrenome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_nivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_plano: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

}, { freezeTableName: true });


Usuario.belongsTo(Nivel, {
  foreignKey: "id_nivel",
  foreignKeyConstraint: true,
});

Usuario.belongsTo(Status, {
  foreignKey: "id_status",
  foreignKeyConstraint: true,
});

Usuario.belongsTo(Plano, {
    foreignKey: "id_plano",
    foreignKeyConstraint: true,
  });


module.exports = Usuario;