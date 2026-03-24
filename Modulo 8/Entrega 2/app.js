const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();

const PORT = 3030;

// Encodear el url que se entrega (transforma el url de la peticion para que sea legible)
app.use(express.urlencoded({ extended: true }));
// Formatear el body de request en formato json
app.use(express.json());
// Habilita el envio de archivos en una petición
app.use(fileUpload({
    useTempFiles: true,           // Habilita el uso de archivos temporales en lugar de mantenerlos en memoria
    tempFileDir: '/tmp/',         // Directorio para los archivos temporales (importante en producción)
    createParentPath: true,       // Crea la carpeta de destino si no existe
    limits: { fileSize: 5 * 1024 * 1024 }, // Límite de tamaño de archivo (ej. 5MB)
    safeFileNames: true,          // Elimina caracteres extraños de los nombres de archivo
    preserveExtension: true       // Conserva la extensión del archivo original
})); 

app.post("/upload/avatar/:userId", async(req, res) =>{

    try {
        const id = req.params.userId

        if(!req.files || Object.keys(req.files).length === 0 || !req.files.avatar){
            res.status(404).send("No se envio ningun archivo")
        }

        const myFile = req.files.avatar;

        const extension = myFile.name.split(".")[1].toLowerCase();

        console.log(extension)

        const extensionesPermitidas = ['.png', '.jpg', '.jpeg', '.gif'];

        if (!extensionesPermitidas.includes("."+extension)) {
            return res.status(400).json({ 
                error: 'Extensión no permitida.',
                permitidas: extensionesPermitidas.join(', ')
            });
        }

        // 3. Generando un nombre de archivo único para evitar colisiones
        const nombreUnico = `${id}_${uuidv4()}.${extension}`;
        const uploadPath = path.join(__dirname, './uploads/avatar', nombreUnico);

        // 4. Moviendo el archivo a su ubicación final usando la promesa
        await myFile.mv(uploadPath);

        // 5. Retornando una respuesta exitosa al cliente
        res.status(200).json({ 
            status: 'success',
            message: '¡Avatar subido correctamente!',
            fileName: nombreUnico,
            path: `/uploads/${nombreUnico}`
        });

    } catch (error) {
        console.error('Error al subir el archivo:', error);
        // Manejamos el error de límite de tamaño
        if (error.code === 'ETOOBIG' || (error.message && error.message.includes('File size limit'))) {
             return res.status(413).json({ error: 'El archivo excede el límite de 5MB.' }); // 413 Payload Too Large
        }
        res.status(500).json({ error: 'Ocurrió un error en el servidor.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});