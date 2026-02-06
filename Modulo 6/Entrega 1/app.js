console.log("EJECUTANDO...")

const http = require('http');

const server = http.createServer((req, res) =>{
    if (req.url === '/'){
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end('<h1>Servidor Ejecutandose en el puerto 3030.</h1>')
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end('<h1 style="color: red">Ruta no encontrada en el servidor.</h1>')
    }
});

server.listen(3030, () =>{
    console.log("Servidor Ejecutandose en http://localhost:3030");
});