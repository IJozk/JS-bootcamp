const express = require('express');
const pool = require('../config/db'); // Importar la configuración de db.js

const app = express();

// Middleware para 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ----------------------- FUNCIONES  ----------------------- 

// Función async para obtener tareas
const obtenerCuentas = async () =>{
  try {
    const result = await pool.query('SELECT * FROM cuentas;');
    const cuentas = result.rows
    // console.log(cuentas)
    return cuentas
  }catch (e){
    console.error("Error en la obstención de cuentas: ",e)
  }
}

//  TABLA cuentas
// ATRIBUTOS: id, titular, saldo

// Función async para insertar una nueva tarea
const realizarTransferencia = async ( cuentaOrigenId, cuentaDestinoId, monto) =>{
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const sqlResta = "UPDATE cuentas SET saldo = saldo - $1 WHERE  id = $2  RETURNING id;"
    const valoresResta = [ monto, cuentaOrigenId]
    const respuestaResta = await client.query(sqlResta, valoresResta)
    console.log(respuestaResta.rows[0].id)
    if(respuestaResta.rows[0].id !== cuentaOrigenId){
      throw new Error("No se pudo realizar la resta de saldo a la cuenta de origen")
    }

    const sqlSuma = "UPDATE cuentas SET saldo = saldo + $1 WHERE  id = $2 RETURNING id;"
    const valoresSuma = [ monto, cuentaDestinoId]
    const respuestaSuma = await client.query(sqlSuma, valoresSuma)
    console.log(respuestaResta.rows[0].id)
    if(respuestaSuma.rows[0].id !== cuentaDestinoId){
      throw new Error("No se pudo realizar la suma de saldo a la cuenta de destino")
    }

    await client.query('COMMIT');
    return `Se realizo la tranferencia con exito desde la cuenta ${cuentaOrigenId} --> a la cuenta ${cuentaDestinoId} , un monto de $${monto}`
  }catch (e){
    await client.query('ROLLBACK');
    return `No se pudo realizar la transferencia desde la cuenta ${cuentaOrigenId} --> a la cuenta ${cuentaDestinoId} , un monto de $${monto} \n Pe causa: ${e}`
  }finally{
    if (client) {
      client.release();
      console.log('Cliente liberado.');
    }
  }
}



// -----------------------  ENPOINTS ----------------------- 

// Ruta para obtener tareas
app.get('/cuentas', async (req, res) => {
  try {
    const cuentas = await obtenerCuentas();
    console.table(cuentas)
    res.json(cuentas)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Realizar realizarTransferencia
// Datos requeridos: cuentaOrigenId, cuentaDestinoId, monto
app.post('/realizarTransferencia', async (req, res) => {
  const cuentaOrigenId = req.body?.cuentaOrigenId || "";
  const cuentaDestinoId = req.body?.cuentaDestinoId || null;
  const monto = req.body?.monto || null;
  try {
    const respuesta = await realizarTransferencia(cuentaOrigenId, cuentaDestinoId, monto);
    console.log(respuesta)

    res.send(respuesta)   

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});