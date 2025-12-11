// Requisitos minimos
const nombre = prompt("Ingrese su nombre:").replace(" ", '');
const apellido = prompt("Ingrese su apellido:").replace(" ", '');

console.log(`${nombre.charAt(0).toLowerCase()}`);
console.log(`${apellido.slice(0, 3).toLowerCase()}`);

let numeroRandom = Math.floor(Math.random() * 90) + 10;

// concatenar con concat()
const nombreUsuario = ''.concat(
    nombre.charAt(0).toLowerCase(),
    apellido.slice(0, 3).toLowerCase(),
    numeroRandom.toString()
);

console.log(`Su nombre de usuario generado es: ${nombreUsuario}`);

// Requisitos avanzados

const dominio = "@miempresa.com";

const email = nombreUsuario.concat(dominio);
console.log(`Su email generado es: ${email}`);

const userDataDiv = document.getElementById("datosUsuario");

// Mostrar en HTML
userDataDiv.innerHTML = `<h2>Su nombre de usuario generado es: ${nombreUsuario}</h2>`;
userDataDiv.innerHTML += `<h2>Su email generado es: ${email}</h2>`;

// Mostrar en alerta
alert(`Su nombre de usuario generado es: ${nombreUsuario}\nSu email generado es: ${email}`);