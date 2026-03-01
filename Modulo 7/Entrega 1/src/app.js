const express = require('express');
const pool = require('../config/db'); // Importar la configuración de db.js
const app = express();

// Ruta para probar la conexión
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    const timeTest = String(result.rows[0].now)
    console.log(String(timeTest))
    res.json({ message: 'Conexión exitosa', time: timeTest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});