const  sequelize  = require("../config/db.js");
const express = require("express");
const cors = require('cors');

const app = express();

// Middleware para realizar peticiones tipo post, put, delete
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 3000;

const sync = async(req, res) => {
    await sequelize.sync({ force: true})
}

app.use((req, res, next) => {
    console.log(`Petición recibida: ${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
    next(); // Llama al siguiente middleware o a la ruta correspondiente. Si no se llama a next(), la petición se quedará "colgada".
});

app.use('/api/sync', async(req, res)=>{
    await sync();
    res.send();
});

// Cargar Rutas
app.use('/api/v1', require('../routes/taskRoutes.js'));


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});