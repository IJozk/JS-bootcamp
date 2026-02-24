const express = require("express");
const path = require("path");
const fs = require('fs');
const functionsMsjs = require('../helpers/crud_mensajes')

const PORT = 3030;

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, '..', 'node_modules', 'bootstrap', 'dist')));

app.get('/', (req, res) => {
    const mensajes = functionsMsjs.leerMensajes()
    res.render('index', {mensajes :mensajes})
});

// app.get('/', (req, res) => {
    
// })

app.post('/enviar-mensaje', (req, res)=>{
    try{
        const response = functionsMsjs.mensajeNuevo(req)
        if (!response) return res.status(400).json({ success: false })
        res.status(201).redirect('/');
    }catch (e){
        console.error(e)
        res.status(500).json({ success: false })
    }
})

app.post('/mensaje/:id', (req, res)=>{
    try {
        const id = req.params.id;
        const mensajeMod = req.body.mensaje;

        functionsMsjs.modificarMensaje(id, mensajeMod)

        console.log(id)
        console.log(mensajeMod)

        res.redirect("/")
    } catch (error) {
        
    }
})

app.post('/eliminar-mensaje/:id', (req, res)=>{
    try {
        const id = req.params.id;
        const response = functionsMsjs.eliminarMensaje(id)
        console.log(response)
        res.redirect("/")
    } catch(e) {
        
    }
})

app.listen(PORT, () => {
  console.log(`El servidor se esta ejecutando en http://localhost:${PORT}`)
})