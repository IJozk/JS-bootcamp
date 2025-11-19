function mostrarMensaje() {
    alert("¡Hola Mundo desde JavaScript!");
    console.log("Mensaje mostrado en la consola");
}

const button  = document.getElementById('botonSubmit')

button.addEventListener("click", function(event) {
    event.preventDefault();
    
    // Obtener valores según los IDs del formulario en contacto.html
    const nombre = document.getElementById('validationCustom01').value.trim();
    const apellido = document.getElementById('validationCustom02').value.trim();
    const email = document.getElementById('validationCustomUsername').value.trim();
    const ciudad = document.getElementById('validationCustom03').value.trim();
    const region = document.getElementById('validationCustom04').value.trim();
    const comentarios = document.getElementById('validationCustom05').value.trim();
    const acuerdo = document.getElementById('invalidCheck').checked;

    const myDiv = document.getElementById('msj_val_1');
    const myDiv2 = document.getElementById('msj_val_2');
    const myDiv3 = document.getElementById('msj_val_3');
    const myDiv4 = document.getElementById('msj_val_4');
    const myDiv5 = document.getElementById('msj_val_5');
    const myDiv6 = document.getElementById('msj_val_6');
    const myDiv7 = document.getElementById('msj_val_7');
    const myDiv8 = document.getElementById('msj_val_8');
    myDiv8.innerHTML = ""

    // Validar campos
    if (!nombre) {
        myDiv.innerHTML = "<p class='text-danger'> El campo esta vacio, ingresa el  nombre</p>"
    }else{
        myDiv.innerHTML = ""
    }
    if( !apellido ){
        myDiv2.innerHTML = "<p class='text-danger' > El campo esta vacio, ingresa el  apellido</p>"
    }else{
        myDiv2.innerHTML = ""
    }
    if( !email ){
        myDiv3.innerHTML = "<p class='text-danger' > El campo esta vacio, ingresa el email </p>"
    }else{
        myDiv3.innerHTML = ""
    }
    if( !ciudad ){
        myDiv4.innerHTML = "<p class='text-danger' > El campo esta vacio, ingresa el ciudad </p>"
    }else{
        myDiv4.innerHTML = ""
    }
    if( !region ){
        myDiv5.innerHTML = "<p class='text-danger' > El campo esta vacio, ingresa el region </p>"
    }else{
        myDiv5.innerHTML = ""
    }
    if( !comentarios ){
        myDiv6.innerHTML = "<p class='text-danger' > El campo esta vacio, ingresa el comentarios </p>"
    }else{
        myDiv6.innerHTML = ""
    }
    if (!acuerdo) {
        myDiv7.innerHTML = "<p class='text-danger' > Debe aceptar el acuerdo de uso. </p>"
    }else{
        myDiv7.innerHTML = ""
    }

    if( nombre != ""  && apellido != "" && email != "" && ciudad != "" && region != "" && comentarios != "" && acuerdo ){
        myDiv8.innerHTML = "<p class='text-success' > Se ha enviado correctamente el cormulario</p>"
        alert('Mensaje enviado. ¡Gracias ' + nombre + '!');
        // Datos a enviar
        const data = { nombre, apellido, email, ciudad, region, comentarios };
        console.log('Datos a enviar:', data);
    }

})

function toggleNav() {
    // alert("Función toggleNav ejecutada");
    const nav = document.querySelector('.botones-nav');
    if (nav) {
        nav.classList.toggle('open-nav');
    } else {
        console.error("No se encontró el elemento de navegación");
    }
}

