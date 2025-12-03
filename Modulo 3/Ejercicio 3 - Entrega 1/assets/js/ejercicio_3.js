const button = document.getElementById("registro");
const toasts = document.querySelectorAll('.toast');
let nombre = "";
let correo = "";
let password = "";
let repeatpass = "";

const btn_login = document.getElementById("login") 

button.addEventListener("click", function(event){

    nombre = prompt("Ingresa tu nombre: ")

    while(nombre === "" || nombre === null){
        nombre = prompt("NO HAS INGRESADO NOMBRE!, ingresa tu nombre: ")
    }

    correo = prompt("Ingresa tu email: ")
    while(correo === "" || correo === null || !correo.includes("@")){
        if(!correo.includes("@")){
            correo = prompt("HAS INGRESADO CORREO ERRONEO!, ingresa tu correo: ")
        }else{
            correo = prompt("NO HAS INGRESADO CORREO!, ingresa tu correo: ")
        }
    }

    password = prompt("Ingrese una contraseña: ")
    while(password === "" || password === null || password.length < 8){
        if(password.length < 8){
            password = prompt("NO HAS INGRESADO CONTRASEÑA VÁLIDA, ingresa una contraseña de minimo 8 caracteres:")
        }else{
            password = prompt("NO HAS INGRESADO CONTRASEÑA, ingresa la contraseña por favor:  ")
        }
    } 

    repeatpass = prompt("Repite la contraseña: ")
    while(repeatpass === "" || repeatpass === null || repeatpass !== password){
        if(repeatpass !== password){
            repeatpass = prompt("LAS CONTRASEÑAS NO COINCIDEN,INGRESALA NUEVAMENTE: ")
        }else{
            repeatpass = prompt("NO HAS INGRESADO CONTRASEÑA, repite la contraseña por favor: ")
        }
    }

    let date1 = new Date();

    const mensaje_confirm = document.getElementById("mensaje_confirm")
    mensaje_confirm.innerHTML = `<h3 style="color: green;">Se ha completado el registro correctamente ${date1.getDay()}-${date1.getMonth()}-${date1.getFullYear()} </h3>`

    toasts.forEach(toastElement => {
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    });

})

btn_login.addEventListener("click", function(event){
    const email_login = document.getElementById("validationCustomUsername");
    const pass_login = document.getElementById("validationCustom03");
    const mensaje_inicio = document.getElementById("mensaje_inicio");

    console.log(correo + " yyyy " + email_login.value)
    console.log(password + " yyyy " + pass_login.value)

    event.preventDefault();

    if(email_login.value == correo && pass_login.value == password){
        mensaje_inicio.innerHTML = `<h3 style="color: blue;"> Bienvenido ${nombre}.</h3>
        <h4> Email: ${correo} </h4>`
        console.log(`✅ Registro exitoso. ¡Bienvenido, ${nombre}!`)
    }
    else{
        mensaje_inicio.innerHTML = `<h3 style="color: red;"> Credenciales incorrectas</h3>`
    }
})




