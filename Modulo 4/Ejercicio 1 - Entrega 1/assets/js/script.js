// Requisitos minimos del ejercicio:

// 1. Crear una clase Libro con las propiedades título, autor y estado (disponible o prestado).
class Libro {
    // Constructor de la clase Libro
    constructor(titulo, autor, estado){
        this.titulo = titulo;
        this.autor = autor;
        this.estado = estado; // 'disponible' o 'prestado' 
    }
    // Metodo para mostrar información del libro
    mostrarInfo() {
        return `El libro ${this.titulo} de ${this.autor} se encuentra ${this.estado}`;
    }
}

// 2. Crear array inventario para almacenar los libros.
const inventario = [];

// 3. Crear función para agregar libros al inventario.
function agregarLibro(titulo, autor, estado) {
    const nuevoLibro = new Libro(titulo, autor, estado);
    inventario.push(nuevoLibro);
}

let titulo = '';
let autor = '';
let estado = '';

function nuevoLibro(){
    do{ 
        do{
            titulo = prompt("Ingrese el título del libro:");
        }while(titulo === null || titulo === '');
        
        do{
            autor = prompt("Ingrese el autor del libro:");
        }while(autor === null || autor === '');
        
        do{
            estado = prompt("Ingrese el estado del libro (disponible/prestado):");
        }while(estado !== 'disponible' && estado !== 'prestado');
        
        agregarLibro(titulo, autor, estado);
    }while(confirm("¿Desea agregar otro libro?"));
    mostrarLibros(inventario);
}

// Requisitos adicionales (opcional):

// 4. Crear función para buscar libros por título o autor.
function buscarLibro(criterio) {
    return inventario.filter(libro =>
        libro.titulo.toLowerCase().includes(criterio.toLowerCase()) ||
        libro.autor.toLowerCase().includes(criterio.toLowerCase())
    );
}

const divLibros = document.getElementById('book-table-body');

function mostrarLibros(libros) {
    divLibros.innerHTML = '';
    libros.forEach(libro => {
        divLibros.innerHTML += `<tr class="text-start align-middle">
            <td>${inventario.indexOf(libro) + 1}</td>
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>${libro.estado}</td>
        </tr>`;

        console.log(libro.mostrarInfo());
    });
}

fetch('./data/inventario.json')
    .then(response => response.json())
    .then(data => { 
        data.forEach(libroData => {
            agregarLibro(libroData.titulo, libroData.autor, libroData.estado);
        });
        mostrarLibros(inventario);
    })
    .catch(error => console.error('Error al cargar el inventario:', error));
