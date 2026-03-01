const express = require('express');
const pool = require('../config/db'); // Importar la configuración de db.js
const app = express();

// Funcion async para obtener usuarios
const obtenerUsuarios = async () =>{
  try {
    const result = await pool.query('SELECT * FROM usuarios;');
    const usuarios = result.rows
    // console.log(usuarios)
    return usuarios
  }catch (e){
    console.error("Error en la obstencion de  usaurios: ",e)
  }
}

const buscarUsuarioXEmail = async (email) =>{
  try {
    const sql = 'SELECT * FROM usuarios WHERE email = $1 ;'
    const valores = [email]
    const result = await pool.query(sql, valores);
    const usuario = result.rows

    if (usuario.length == 0){
      throw new Error('No se encontro ningun usuario');
    }

    // console.log(usuarios)
    return usuario
  }catch (e){
    console.error({ message: e})
  }
}


// Ruta para probar la conexión
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await obtenerUsuarios();
    console.log(usuarios)
    res.json(usuarios)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/usuario/:email', async (req, res) => {
  try {
    const email = req.params.email
    const usuario = await buscarUsuarioXEmail(email);
    if (usuario.error){
      res.send(usuario.error)
    }else{
      console.log(usuario)
      res.json(usuario)
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});