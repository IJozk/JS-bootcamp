const  sequelize  = require("../config/db.js")
const { DataTypes } = require('sequelize');

const Publicacion = sequelize.define(
    'Publicaciones',
    {
        // Model attributes are defined here
        titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        contenido: {
        type: DataTypes.TEXT,
        allowNull: false,
        },
    }
);

module.exports = Publicacion;