function codigoAntiguo(){
    console.time('Medir tiempo de ejecución:');
    console.log('%c[Codigo Antiguo]', 'color: white; background-color: red; padding: 2px 5px; border-radius: 2px;');
    // Objeto que representa a un usuario
    var usuario = {
        nombre: 'Ana',
        edad: 24,
        ciudad: 'Barcelona'
    };

    // Función tradicional para crear el mensaje de presentación
    function crearMensajePresentacion(user) {
        var nombre = user.nombre;
        var edad = user.edad;
        var ciudad = user.ciudad;
        var mensaje = 'Hola, mi nombre es ' + nombre + ', tengo ' + edad + ' años y vivo en la ciudad de ' + ciudad + '.';
        return mensaje;
    }

    // Se llama a la función y se muestra el resultado en consola
    var mensajeDeBienvenida = crearMensajePresentacion(usuario);
    console.log(mensajeDeBienvenida);
    console.timeEnd('Medir tiempo de ejecución:');
}


function codigoRefactorizado(){
    console.time('Medir tiempo de ejecución:');
    console.log('%c[Refactorizado]', 'color: white; background-color: green; padding: 2px 5px; border-radius: 2px;');

    // Objeto que representa a un usuario
    const usuario = {
        nombre: 'Ana',
        edad: 24,
        ciudad: 'Barcelona'
    };

    // Función tradicional para crear el mensaje de presentación
    const crearMensajePresentacion = (user) => {
        const { nombre, edad, ciudad } = user;
        return `Hola, mi nombre es ${nombre}, tengo ${edad} años y vivo en la ciudad de ${ciudad}.`;
    }

    // Se llama a la función y se muestra el resultado en consola
    console.log(crearMensajePresentacion(usuario));
    console.timeEnd('Medir tiempo de ejecución:');
}