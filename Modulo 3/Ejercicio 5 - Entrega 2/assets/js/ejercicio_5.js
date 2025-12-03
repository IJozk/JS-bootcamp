// Requisitos minimos

let listaDeTareas = [];
let contadorTareas = 0;
let mostrarTareas = "--- Lista de Tareas Pendientes ---\n";

do{
    contadorTareas++;
    let descTarea = prompt("Escriba una nueva tarea")
    let fecha = prompt("Ingrese vencimiento de tarea: formato(01/01/2025)")
    let nuevatarea = {
        numero: contadorTareas,
        descripcion: descTarea,
        estado: false,
        fecha_venc: new Date(fecha)
    }
    listaDeTareas.push(nuevatarea)
    
}while(confirm("¿Deseas añadir otra tarea?"))

if (listaDeTareas<=0){
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
    if (listaDeTareas<=0){
        cont_tabla.innerHTML += "No hay tareas pendientes"
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
    let nuevatarea = {
        numero: listaDeTareas.length++,
        descripcion: descTarea,
        estado: false,
        fecha_venc: new Date(fechaVenc)
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
