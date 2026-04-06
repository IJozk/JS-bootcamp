import 'dotenv/config';
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT =  process.env.PORT || '';
const SECRET =  process.env.SECRET || '';

app.set('view engine', 'ejs');

app.set('views', path.join('./public/views')); 

app.use(cors())

const users = [{
    email: "ejemplo@test.cl",
    password: "admin123"
},];

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
        title: 'API REST node js + express + jwt',
        version: '1.0.0',
        description: 'Documentación sencilla con Swagger',
        },
        servers: [
        {
            url: `http://localhost:${PORT}`,
        },
        ],
    },
    // Indica dónde están las rutas para leer los comentarios JSDoc
    apis: ['./app.js'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware para realizar peticiones tipo post, put, delete
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/register",  async(req, res) => {
    res.render("register");
})

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registro de un usuario
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito
 *       400:
 *          description: Se requieren datos para el registro
 */
app.post("/register",  async(req, res) => {
    console.log("En registro")
    try {
        if( !req.body || !req.body.email || !req.body.password ){
            return res.status(400).json({ error: "Se requieren datos para el registro"});
        }

        const email = req.body.email || "";
        const password = req.body.password || "";

        if( users.filter( user  => user.email === email).length !== 0  ){
            return res.status(409).json({ error: "Ya existe un usuario con el nombre que se esta intentando registrar"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        users.push({id: users.length + 1 ,email: email, password: hashedPassword, rol: req.body.rol })

        console.log(users)

        res.status(201).json({ status: "success", message: "Se resgistro al usuario correctamente" })
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor"});
    }
});

app.get("/login",  async(req, res) => {
    res.render("login");
})


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login de usuario
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito
 *       400:
 *          description: Se requieren datos para el registro
 */
app.post( "/login",  async(req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        
        return res.status(400).json({ error: 'Email y contraseña son requeridos.' });
    }

    try {
        console.log(email)
        console.log(password)
        const usuario = users.find( u  => u.email === email );

        if (!usuario) {
            console.log("FALTA USER")
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const esValida = await bcrypt.compare(password, usuario.password);

        if (!esValida) {
            console.log("VALIDAR")
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const payload = { id: usuario.id, email: usuario.email, rol: usuario.rol };
        const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });

        res.redirect( "perfil");

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ error: 'Acceso denegado. Se requiere token.' });
    }

    // Bearer jsahjdhsajkdhsa.dhasuhdusa.dishjauiodhsua
    const token = authHeader.split(' ')[1];

    try {
        const payloadDecodificado = jwt.verify(token, SECRET);
        req.usuario = payloadDecodificado; // Guardamos el payload en req
        next();
    } catch (error) {
        res.status(403).json({ error: 'Token inválido o expirado.' });
    }
};

app.get('/perfil', verificarToken, (req, res) => {
    // Gracias al middleware, req.usuario contiene los datos del token
    res.json({ 
        mensaje: 'Acceso concedido al perfil', 
        usuario: req.usuario
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo, ver documentación en http://localhost:${PORT}/api-docs`)
})