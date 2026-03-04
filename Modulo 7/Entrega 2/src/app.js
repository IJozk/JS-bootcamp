const express = require('express');
const pool = require('../config/db'); // Importar la configuración de db.js

const app = express();

// Middleware para 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

const crearUsuario = async ( nombre, email) =>{
  try {
    const sql = 'INSERT INTO usuarios( nombre, email) VALUES ( $1, $2);'
    const valores = [ nombre, email];
    const result = await pool.query(sql, valores);

    console.log(result.rowCount)
    return result.rowCount
  }catch (e){
    console.error("Error en la obstencion de  usaurios: ",e)
  }
}


// Ruta para obtener usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await obtenerUsuarios();
    console.table(usuarios)
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

app.post('/crearUsuario', async (req, res) => {
  const nombre = req.body.nombre || "";
  console.log(nombre )
  const email = req.body.email
  console.log(email)
  try {
    const usuario = await crearUsuario(nombre, email);
    console.log(usuario)
    if(usuario == 0){
      throw new Error("No se inserto ningun usuario")
    }else{
      res.send(usuario)
    }   

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});