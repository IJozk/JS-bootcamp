const Task = require("../models/Task")

// Funciones que gestionan la lógica de las peticiones HTTP (GET, POST, PUT, DELETE) recibidas en rutas específicas

// Función para crear tareas
const createTask = async(req, res) =>{

    try {
        
        const { title, description, completed } = req.body;

        if(!title || title === ""){
            return res.status(400).json({ status: 'error', error: 'Title is required' });
        }

        const newTask = await Task.create({title, description, completed})

        res.status(201).location(`/api/v1/tasks/${newTask.id}`).json({ status: 'success', data: newTask });

    } catch (error) {
        console.error('Error al insertar una nueva tarea:', error);
        res.status(500).send('Error al crear la tarea');
    }
}

// Leer las tareas
const getTasks = async(req, res) =>{

    try {

        const tasks = await Task.findAll()

        res.status(200).location(`/api/v1/tasks`).json({ status: 'success', data: tasks });

    } catch (error) {
        console.error('Error en la lectura de las tareas:', error);
        res.status(500).send('Error al obtener tareas');
    }
}

// Función para buscar tarea por id
const getTaskByID = async(req, res) =>{

    try {
        const id = req.params.id;

        const task = await Task.findByPk(id)

        if(task===null || task==0){
            res.status(404).send(`No se encontro la tarea con el id: ${id}`)
        }

        res.status(200).location(`/api/v1/tasks/${id}`).json({ status: 'success', data: task });

    } catch (error) {
        console.error('Error en la busqueda de una tarea:', error);
        res.status(500).send('Error al obtener la tarea');
    }
}

// Función para modificar tareas
const updateTask = async(req, res) =>{
    try {
        const id = req.params.id;
        const body = req.body;

        const task = await Task.update( body, { where: { id: id } })

        if(task===null || task==0){
            res.status(404).send(`No se encontro la tarea con el id: ${id}`)
        }

        res.status(200).location(`/api/v1/tasks/${id}`).json({ status: 'success', data: task });

    } catch (error) {
        console.error('Error en la modificación de una tarea:', error);
        res.status(500).send('Error al modificar la tarea');
    }
}

// Función para eliminar tareas
const deleteTask = async(req, res) =>{

    try {
        const id = req.params.id;

        const task = await Task.destroy({where: { id: id } })

        if(task===null || task==0){
            res.status(404).send(`No se encontro la tarea con el id: ${id}`)
        }

        res.status(204).send()

    } catch (error) {
        console.error('Error en la lectura de las tareas:', error);
        res.status(500).send('Error al obtener tareas');
    }
}

// Exportamos las funciones
module.exports = {
    createTask,
    getTasks,
    getTaskByID,
    updateTask,
    deleteTask
}