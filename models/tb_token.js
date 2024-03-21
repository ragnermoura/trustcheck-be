const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");
const Usuario = require("./tb_usuarios");

const Token = conn.define(
  "tb_token",
  {
    id_token: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false, 
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

Token.belongsTo(Usuario, {
  foreignKey: "id_user",
  foreignKeyConstraint: true,
});


module.exports = Token;