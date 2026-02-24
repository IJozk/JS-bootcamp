console.log(process.argv)

console.log(process.argv[0])

const argumentos = process.argv.slice(2);

const indexUsuario = argumentos.indexOf("--usuario")


if(indexUsuario !== -1 &&  argumentos[indexUsuario +1]){
    resultado = argumentos[indexUsuario +1]
}else if(indexUsuario == -1){
    resultado = "No existe una variable llamada usuario"
}else{
    resultado ="No se entrego un valor a la variable usuario"
}


console.log(resultado)