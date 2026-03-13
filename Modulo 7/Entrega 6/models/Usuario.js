const  sequelize  = require("../config/db.js")
const { DataTypes } = require('sequelize');

const Usuario = sequelize.define(
    'Usuario',
    {
        // Model attributes are defined here
        nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        email: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    }
);

module.exports = Usuario;