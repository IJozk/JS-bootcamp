const express = require("express");
const path = require('path');
const hbs = require("hbs");

const app = express();

const PORT = 3030;

const aves = [
    {
        nombre: "Pajaro carpintero",
        url_img: "assets/img/carpintero.jpg",
        descripcion: "El pájaro carpintero (familia Picidae) es un ave arborícola, famosa por su capacidad de taladrar madera con picos fuertes tipo cincel para buscar insectos. Poseen patas zigodáctilas (dos dedos hacia adelante, dos atrás) para trepar, lengua larga y pegajosa, y un cráneo adaptado para amortiguar golpes. Viven en bosques de casi todo el mundo. "
    },
    {
        nombre: "Picaflor",
        url_img: "assets/img/picaflor.gif",
        descripcion: "El picaflor en Chile destaca por especies como el Picaflor Chico (Sephanoides sephaniodes), común desde Atacama a Tierra del Fuego, y el endémico y en peligro Picaflor de Arica (Eulidia yarrellii), uno de los más pequeños del mundo. Son aves territoriales, nectarívoras y polinizadoras clave que habitan desde la costa hasta la precordillera. "
    },
    {
        nombre: "Condor",
        url_img: "assets/img/condor.jpg",
        descripcion: "El cóndor andino (Vultur gryphus) es una de las aves voladoras más grandes y pesadas del mundo, con una envergadura de hasta 3 metros, emblemática de la cordillera de los Andes. Es un carroñero monógamo que cumple un rol ecológico vital, pero se encuentra en peligro de extinción debido al envenenamiento y pérdida de hábitat. "
    }
]

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, '../views'));


app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules/bootstrap/dist')))


hbs.registerPartials(path.join(__dirname, '../views/partials'), (err) => {
    if (err) {
        console.error('Error al registrar parciales:', err);
    } else {
        console.log('Partiales registrados correctamente.');
    }
});

hbs.registerHelper('truncate', (text, length) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
});

hbs.registerHelper('ifEquals', function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this);
});

app.get('/', (req, res) => {
    res.render('inicio', {titulo:"Inicio", aves, ruta: "/"});
});

app.get('/contactanos', (req, res) => {
    res.render('contactanos', {titulo:"Contactanos", ruta: "/contactanos"});
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})