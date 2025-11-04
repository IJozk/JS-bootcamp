function mostrarMensaje() {
    alert("¡Hola Mundo desde JavaScript!");
    console.log("Mensaje mostrado en la consola");
}

function submitMessage(event) {
    event.preventDefault();
    const form = event.target;
    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const mensaje = form.mensaje.value.trim();

    if (!nombre || !email || !mensaje) {
        alert('Por favor complete todos los campos.');
        return;
    }

    const data = { nombre, email, mensaje };
    console.log('Datos a enviar:', data);

    console.log('Mensaje enviado. Gracias ' + nombre + '!');
    window.location.replace("form_enviado.html")
    form.reset();
}