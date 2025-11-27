const nombreMascota = "Kchupin"

const edadMascota = 3

const factorConversion = 7

let edadPerro = edadMascota * factorConversion

console.log("Tu mascota " + nombreMascota + ", tiene " + String(edadPerro) + " años en edad de perro.")

const buttonConv = document.getElementById("btnConv")

buttonConv.addEventListener("click", function(event){
    event.preventDefault();


    const edadInput = document.getElementById("edadMascota").value;
    const nombreMascota = document.getElementById("nombreMascota").value;

    const divRespuesta = document.getElementById("respuesta")

    divRespuesta.innerHTML = ""

    const respuesta = "Tu mascota " + nombreMascota + ", tiene " + String(edadInput*factorConversion) + " años en edad de perro."

    divRespuesta.innerHTML = "<h1>" + respuesta + "</h1><br>"
    
    if(edadInput*factorConversion > 30){
        divRespuesta.innerHTML +=   "<p style='color: red;'> Advertencia tu perro tiene mas de 30 años</p>"
    }else{
        divRespuesta.innerHTML +=   "<p style='color: green;'> A tu perro aun le quedar muchoas años de vida</p>"
    }
})
