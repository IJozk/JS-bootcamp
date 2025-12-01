const estudiantes =     [{nombre: 'Jorge', apellido: 'Riffo', edad: 10, promedio: 5.0},
                        {nombre: 'Maria', apellido: 'Ortiz', edad: 12, promedio: 3.4}, 
                        {nombre: 'Juana', apellido: 'De arco', edad: 9, promedio: 6.2},
                        {nombre: 'Manuel', apellido: 'Moraga', edad: 9, promedio: 6.2}]

const cant_est_div = document.getElementById('body-table')
const body_table = document.getElementById('body-table')

cargarEstudiantes(estudiantes)

function cargarEstudiantes(estudiantesin){
    body_table.innerHTML = ""
    estudiantesin.sort((a, b) => a.edad - b.edad)
    if (estudiantesin.length > 0){
        for (i in estudiantesin){ 
            console.log(estudiantesin[i].nombre + ' ' + estudiantesin[i].apellido)
            body_table.innerHTML += `<tr class="">
                                        <td scope="row">${estudiantesin[i].nombre} ${estudiantesin[i].apellido}</td>
                                        <td>${estudiantesin[i].edad}</td>
                                        ${estudiantesin[i].promedio >= 4 ? "<td style='color: green;'>" + estudiantesin[i].promedio + "</td>" : "<td style='color: red;'>" + estudiantesin[i].promedio + "</td>" }
                                        <td><button class='btn btn-danger' onclick="eliminar(this)">Eliminar</button></td>
                                    </tr>`
        }
    }
    let cantEstudiantes = document.getElementById("cantidad-est")
    cantEstudiantes.innerHTML = `Cantidad Estudiantes:    ${estudiantes.length}`
}

function deleteRow(index){
    estudiantes.splice(index-1, 1);
    cargarEstudiantes(estudiantes)
}

function eliminar(fila) {
    let row = fila.parentNode.parentNode;
    let rowIndex = row.rowIndex;
    console.log(rowIndex)
    deleteRow(rowIndex);
}

function addRow(){
    let nombreIn = document.getElementById("nombreIn").value
    let apellidoIn = document.getElementById("apellidoIn").value
    let edadIn = document.getElementById("edadIn").value
    let promedioIn = document.getElementById("promedioIn").value

    let nuevo_estudiante = {
        nombre: nombreIn, apellido: apellidoIn, edad: edadIn, promedio: promedioIn
    }

    estudiantes.push(nuevo_estudiante)

    document.getElementById("nombreIn").value = ''
    document.getElementById("apellidoIn").value = ''
    document.getElementById("edadIn").value = ''
    document.getElementById("promedioIn").value = ''

    cargarEstudiantes(estudiantes)
}

function filtroNombre(){
    let busqueda = document.getElementById("filtroNombre").value
    const estudiantesFilt = estudiantes.filter(estudiante => estudiante.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    cargarEstudiantes(estudiantesFilt)
}