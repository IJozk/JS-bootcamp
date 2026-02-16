const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Inicio', 
    usuarios: [{nombre: "Pedro",
                puesto: "Mecanico"},
                {nombre: "Juana",
                puesto: "Profesora"},
                {nombre: "Manuel",
                puesto: "Electricista"}
              ] 
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});