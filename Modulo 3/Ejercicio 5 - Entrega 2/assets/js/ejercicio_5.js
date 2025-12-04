// Requisitos minimos

let listaDeTareas = [];
let contadorTareas = 0;
let mostrarTareas = "--- Lista de Tareas Pendientes ---\n";

do{
    contadorTareas++;
    let descTarea = prompt("Escriba una nueva tarea")
    let fecha = prompt("Ingrese vencimiento de tarea: formato(DD/MM/YYYY) ejemplo: 20/12/2025")
    if(!descTarea == "" || !fecha == ""){
        // Convertir DD/MM/YYYY a formato válido
        // En el prompt se estaba registrando la fecha en formato MM/DD/YYYY y 
        // las instrucciones eran en formato DD/MM/YYYY. 
        let partes = fecha.split("/");
        let fechaValida = new Date(partes[2], partes[1] - 1, partes[0]);

        let nuevatarea = {
            numero: contadorTareas,
            descripcion: descTarea,
            estado: false,
            fecha_venc: fechaValida
        }
        listaDeTareas.push(nuevatarea)
    }
    
    
}while(confirm("¿Deseas añadir otra tarea?"))

if (listaDeTareas.length <= 0){
    mostrarTareas += "No hay tareas pendientes"
}else{
    for(i in listaDeTareas){
        mostrarTareas += `${Number(i)+1}. ${listaDeTareas[i].descripcion}\n`
    }
}

console.table(mostrarTareas)

// Manejo de tareas en la vista

const cont_tabla = document.getElementById("contenidoTabla")

cargarTareas()

function cargarTareas(){
    cont_tabla.innerHTML = ''
    if (listaDeTareas.length <= 0){
        cont_tabla.innerHTML += "<tr> No hay tareas pendientes </tr>"
    }else{
        for(i in listaDeTareas){
            cont_tabla.innerHTML += `<tr>
                                        <td>${listaDeTareas[i].numero}</td>
                                        <td>${listaDeTareas[i].descripcion}</td>
                                        <td>${listaDeTareas[i].estado ? "Listo" : "Pendiente"}</td>
                                        <td>${listaDeTareas[i].fecha_venc}</td>
                                        <td><button class='btn btn-success' onclick="marcarListo(${i})">Marcar listo</button>
                                        <button class='btn btn-danger' onclick="eliminarTarea(${i})">Eliminar</button></td>
                                    </tr>`
        }
    }
}

function agregarTarea(){
    let descTarea = document.getElementById("descripcionTarea").value
    let fechaVenc = document.getElementById("dateVencimiento").value

    // Convertir fecha del input (YYYY-MM-DD) evitando problemas de zona horaria
    // En el selector de fecha el problema era que se insertaba directamente la decha desde el input, 
    // antes debe pasar por el constructor Date() para no tener problemas con zona horaria. 
    let partes = fechaVenc.split("-");
    let fechaValida = new Date(partes[0], partes[1] - 1, partes[2]);

    let nuevatarea = {
        numero: listaDeTareas.length + 1,
        descripcion: descTarea,
        estado: false,
        fecha_venc: fechaValida
    }
    listaDeTareas.push(nuevatarea)
    cargarTareas()
}

function marcarListo(index){
    listaDeTareas[index].estado = true
    cargarTareas()
}

function eliminarTarea(index){
    listaDeTareas.splice(index, 1);
    cargarTareas()
}
