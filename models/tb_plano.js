const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const ItemPlano = require("./tb_plano_item"); 


const Plano = conn.define("tb_plano", {
    id_plano: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    titulo_plano: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subtitulo_plano: {      
        type: DataTypes.STRING,
        allowNull: false,
    },
    valor_plano_consulta: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dias_free: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    valor_plano_mes: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tag: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}, { freezeTableName: true });


Plano.hasMany(ItemPlano, {
    foreignKey: 'id_plano',
  });

module.exports = Plano;