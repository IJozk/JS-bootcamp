const fs = require("fs");
const path = require("path");

// Ruta al archivo mensajes.json (ajusta si tu data está en otra carpeta)
const filePath = path.join(__dirname, '..', 'data', 'mensajes.json');

module.exports = {
    
    // R: READ
    leerMensajes: () => {
        try {

            if (!fs.existsSync(filePath)) {
                // Devuelve array vacío si aún no existe el archivo
                return ["No se encontraron mensajes"];
            }

            const raw = fs.readFileSync(filePath, 'utf8');
            const mensajes = JSON.parse(raw);
            return mensajes;
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.error('El archivo no existe:', error);
            } else if (error instanceof SyntaxError) {
                console.error('JSON inválido en mensajes.json:', error);
            } else {
                console.error('Error leyendo mensajes:', error);
            }
            return null;
        }
    },
    // C: CREATE
    mensajeNuevo: (req) => {
        try {
            const nombre = req?.body?.nombre;
            const mensaje = req?.body?.mensaje;
            if (!nombre || !mensaje) {
                throw new Error('Faltan campos nombre o mensaje');
            }

            // Asegura existencia del archivo
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(path.dirname(filePath), { recursive: true });
                fs.writeFileSync(filePath, '[]', 'utf8');
            }

            const raw = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(raw);
            const mensajes = data

            console.log(mensajes.mensajes)

            const mensajeNuevo = { nombre, mensaje: mensaje, fecha: new Date().toISOString() };
            mensajes.push(mensajeNuevo);

            fs.writeFileSync(filePath, JSON.stringify(mensajes, null, 2), 'utf8');

            return mensaje;
        } catch (error) {
            console.error('Error en mensajeNuevo:', error);
            return null;
        }
    },

    // U: UPDATE
    modificarMensaje: (id, mensajeMod) =>{
        try {

            const raw = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(raw);
            const mensajes = data

            mensajes[id].mensaje = mensajeMod

            fs.writeFileSync(filePath, JSON.stringify(mensajes, null, 2), 'utf8');

        } catch (error) {
            
        }
    },

    // D: DELETE
    eliminarMensaje: (id) => {
        try{

            const raw = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(raw);
            const mensajes = data

            if (id > -1 && id < mensajes.length) {
                mensajes.splice(id, 1);
            }

            fs.writeFileSync(filePath, JSON.stringify(mensajes, null, 2), 'utf8')

            return "Mensaje eliminado"

        } catch (e) {

        }
    }

}