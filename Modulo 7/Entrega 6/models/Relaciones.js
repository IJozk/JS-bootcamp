const  sequelize  = require("../config/db.js");
const { DataTypes } = require('sequelize');
const Publicacion = require('./Publicacion.js');
const Usuario = require('./Usuario.js');

Usuario.hasMany(Publicacion)
Publicacion.belongsTo(Usuario)

module.exports = { 
    Usuario,
    Publicacion 
}