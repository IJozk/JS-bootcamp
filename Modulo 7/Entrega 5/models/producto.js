const  sequelize  = require("../config/db.js")
const { DataTypes } = require('sequelize');

const Producto = sequelize.define(
    'Producto',
    {
        // Model attributes are defined here
        nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        lastName: {
        type: DataTypes.FLOAT,
        allowNull: false,
        },
    }
);

module.exports = Producto;