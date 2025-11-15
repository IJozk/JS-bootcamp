function mostrarMensaje() {
    alert("¡Hola Mundo desde JavaScript!");
    console.log("Mensaje mostrado en la consola");
}

function submitMessage(event) {
    event.preventDefault();
    const form = event.target;
    
    // Obtener valores según los IDs del formulario en contacto.html
    const nombre = document.getElementById('validationCustom01').value.trim();
    const apellido = document.getElementById('validationCustom02').value.trim();
    const email = document.getElementById('validationCustomUsername').value.trim();
    const ciudad = document.getElementById('validationCustom03').value.trim();
    const region = document.getElementById('validationCustom04').value.trim();
    const comentarios = document.getElementById('validationCustom05').value.trim();
    const acuerdo = document.getElementById('invalidCheck').checked;

    // Validar campos
    if (!nombre || !apellido || !email || !ciudad || !region || !comentarios) {
        alert('Por favor complete todos los campos.');
        return;
    }

    if (!acuerdo) {
        alert('Debe aceptar el acuerdo de uso.');
        return;
    }

    // Datos a enviar
    const data = { nombre, apellido, email, ciudad, region, comentarios };
    console.log('Datos a enviar:', data);

    // Mostrar confirmación
    alert('Mensaje enviado. ¡Gracias ' + nombre + '!');
    
    // Redirigir (opcional, descomenta si existe el archivo)
    window.location.replace("./form_enviado.html");
}

function toggleNav() {
    // alert("Función toggleNav ejecutada");
    const nav = document.querySelector('.botones-nav');
    if (nav) {
        nav.classList.toggle('open-nav');
    } else {
        console.error("No se encontró el elemento de navegación");
    }
}