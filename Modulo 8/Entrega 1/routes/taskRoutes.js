const  sequelize  = require("../config/db.js");
const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController.js")

// Enpoints para acceder a peticiones que esten relacionadas a las tareas
router.get("/tasks", taskController.getTasks)
router.get("/tasks/:id", taskController.getTaskByID)
router.post("/tasks", taskController.createTask)
router.put("/tasks/:id", taskController.updateTask)
router.delete("/tasks/:id", taskController.deleteTask)

module.exports = router;
