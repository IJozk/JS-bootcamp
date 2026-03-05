const express = require('express');
const pool = require('../config/db'); // Importar la configuración de db.js

const app = express();

// Middleware para 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ----------------------- FUNCIONES  ----------------------- 

// Función async para obtener tareas
const obtenerTareas = async () =>{
  try {
    const result = await pool.query('SELECT * FROM tareas;');
    const tareas = result.rows
    // console.log(tareas)
    return tareas
  }catch (e){
    console.error("Error en la obstención de tareas: ",e)
  }
}

// Función async para insertar una nueva tarea
const insertarTarea = async ( titulo, descripcion, completada) =>{
  try {
    const sql = 'INSERT INTO tareas( titulo, descripcion, completada ) VALUES ( $1, $2, $3);'
    const valores = [ titulo, descripcion, completada ];
    const result = await pool.query(sql, valores);

    if(result.rowCount == 0){
      throw new Error("No se inserto ninguna tarea")
    }

    console.log(`Tarea "${titulo}" insertada con éxito. Filas afectadas: ${result.rowCount}`)
    return  result.rowCount
  }catch (e){
    console.error("Error en la inserción de tareas: ",e)
  }
}

// Función async para modificar una tarea
const modificarTarea = async ( titulo, descripcion, id) =>{
  try {
    const sql = 'UPDATE tareas SET titulo = $1, descripcion = $2 WHERE id = $3';
    const valores = [titulo, descripcion, id];
    const result = await pool.query(sql, valores);

    if(result.rowCount == 0){
      throw new Error("No se inserto ninguna tarea")
    }

    console.log(`Tarea con ID ${id} actualizada. Filas afectadas: ${result.rowCount}`)
    return result.rowCount
  }catch (e){
    console.error("Error en la modificación de tareas: ",e)
  }
}

// Función async para eliminar una tarea
const eliminarTarea = async (  id) =>{
  try {
    const sql = 'DELETE FROM tareas WHERE id = $1';
    const valores = [id];
    const result = await pool.query(sql, valores);

    if(result.rowCount == 0){
      throw new Error("No se elimino ninguna tarea")
    }

    console.log(`Tarea con ID ${id} eliminada. Filas afectadas: ${result.rowCount}`)
    return result.rowCount
  }catch (e){
    console.error("Error en la eliminación de tareas: ",e)
  }
}

// -----------------------  ENPOINTS ----------------------- 

// Ruta para obtener tareas
app.get('/tareas', async (req, res) => {
  try {
    const tareas = await obtenerTareas();
    console.table(tareas)
    res.json(tareas)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/insertarTarea', async (req, res) => {
  const titulo = req.body?.titulo || "";
  console.log(titulo )
  const descripcion = req.body?.descripcion || null;
  console.log(descripcion)
  const completada = req.body?.completada || null;
  try {
    const tarea = await insertarTarea(titulo, descripcion, completada);
    console.log(tarea)
    if(tarea == 0){
      throw new Error("No se insertó ninguna tarea")
    }else{
      res.send(tarea)
    }   

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/modificarTarea', async (req, res) => {
  const titulo = req.body?.titulo || "";
  const descripcion = req.body?.descripcion || null;
  const id = req.body?.id || null;

  try {
    const result = await modificarTarea(titulo, descripcion, id);
    console.log(result)
    if(result == 0){
      throw new Error("No se modificó ninguna tarea")
    }else{
      res.send(result)
    }   

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/eliminarTarea', async (req, res) => {
  const id = req.body?.id || null;

  try {
    const result = await eliminarTarea( id);
    console.log(result)
    if(result == 0){
      throw new Error("No se eliminó ninguna tarea")
    }else{
      res.send(result)
    }   

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});