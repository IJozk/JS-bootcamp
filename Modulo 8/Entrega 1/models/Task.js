const  sequelize  = require("../config/db.js")
const { DataTypes } = require('sequelize');

// Definimos el modelo task para manipular objetos de tipo tarea en el servidor
const Task = sequelize.define(
    'Task',
    {
        title: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        description : {
        type: DataTypes.TEXT,
        allowNull: false,
        },
        completed:{
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: false
        }
    }
);

module.exports = Task;