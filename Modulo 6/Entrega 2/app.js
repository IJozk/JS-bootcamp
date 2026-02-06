const express = require('express');

const app = express();

const PORT = process.env.PORT || 3030;

app.get('/', (req, res) => {
    res.send('¡Hola Mundo con Express!');
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutandose ruta http://localhost:${PORT}`);
});