const express = require('express');
const {obtenerCuentas, realizarTransferencia} = require("../services/transferencia")  ;

const app = express();

// Middleware para realizar llamadas al servidor tipo post
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// -----------------------  ENDPOINTS ----------------------- 

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