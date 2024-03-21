const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Usuario = require("./tb_usuarios");

const ConsultaCount = conn.define("tb_consulta_count", {
    id_consulta_count: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    consultas: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
 

}, { freezeTableName: true });


ConsultaCount.belongsTo(Usuario, {
    foreignKey: "id_user",
    foreignKeyConstraint: true,
});



module.exports = ConsultaCount;