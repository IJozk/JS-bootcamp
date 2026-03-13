const  sequelize  = require("../config/db.js");
const { Publicacion, Usuario } = require('../models/Relaciones.js');
const  controller  = require('../controllers/relacionesController.js');
const express = require("express");

const app = express();

// Middleware para realizar peticiones tipo post, put, delete
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Funciones Auxiliares

const prueba = async () =>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return 'Connection has been established successfully.'
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// ------------------------ ENDPOINTS ---------------------------------

app.get( "/sync", async( req, res) =>{
    try{
        await sequelize.sync({ force: true }) // Use alter for development 
        console.log("Sincronización exitosa")
        res.send("Sincronización exitosa")
    } catch (e){
        console.error(e)
        res.send("Error en sync")
    }
}  )

app.get( "/prueba", async(req, res ) =>{
    const result = await prueba();
    res.send(result)
});

app.get( "/usuarios", async(req, res ) =>{
    const result = await controller.getUsuarios(req, res );
    res.send(result)
});

app.post( "/crearUsuario", async(req, res ) =>{
    const result = await controller.createUsuario(req, res );
    res.send(result)
});

// PATCH Aplica modificaciones parciales a un recurso.
app.patch( "/producto/:id", async(req, res ) =>{
    const result = await productoController.updateProducto(req, res );
    res.send(result)
})

app.delete( "/producto/:id", async(req, res ) =>{
    await productoController.deleteProducto(req, res );
    res.send("Se elimino el producto correctamente")
})

app.post( "/crearPublicacion", async(req, res ) =>{
    const result = await controller.crearPublicacion(req, res );
    res.send(result)
});

app.get("/publicacionesUsuario/:id", async(req, res ) =>{
    const result = await controller.obtenerPublicacionesXusuario(req, res );
    res.send(result)
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});