// **Selección de Elementos:*** 
// Selecciona el elemento de la imagen principal (`<img>` con id `imagen-principal`).
// * Selecciona **todos** los elementos de las imágenes thumbnail (las que tienen la clase `thumbnail`).
// Esto te dará una colección de elementos o `NodeList`.

const imagenPrincipal = document.getElementById('imagen-principal');
const thumbnails = document.querySelectorAll(".thumbnail");
const contenedorImagenPrincipal = document.querySelector("#imagen-principal-container")

// **Añadir Event Listeners a los Thumbnails:*** 
// Itera sobre la colección de thumbnails (puedes usar un bucle `forEach`).
// * A cada thumbnail, añádele un `addEventListener` que escuche el evento `click`.

thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
        //   **Definir la Lógica del Evento:*** 
        // Dentro de la función que se ejecuta al hacer clic, haz lo siguiente:
        //   * Obtén la URL (el `src`) del thumbnail que fue clickeado.
        //   * Actualiza el `src` de la imagen principal con la URL del thumbnail.
        //   * Obtén el texto alternativo (`alt`) del thumbnail clickeado. 
        //    Este texto lo usarás como pie de foto.

        const urlThumbnail = thumbnail.src

        imagenPrincipal.src = urlThumbnail

        const altThumbnail = thumbnail.alt
        console.log(urlThumbnail)
        console.log(altThumbnail)

        // **Crear y Añadir el Pie de Foto:*** 
        // **Importante:** Primero, busca si ya existe un pie de foto anterior y, si es así, 
        // elimínalo para evitar que se acumulen.
        // * Usa `document.createElement('p')` para crear un nuevo elemento de párrafo.
        // * Asígnale un `id` (ej: "pie-de-foto") y su contenido de texto (`textContent`) 
        // con el valor del `alt` que obtuviste.
        // * Finalmente, usa `appendChild()` para añadir este nuevo párrafo al contenedor de 
        // la imagen principal (`div` con id `imagen-principal-container`).
        
        const pieDeFoto = document.querySelector("#pie-de-foto")

        if (!pieDeFoto){
            console.log(pieDeFoto)
            const pieDeFotoNuevo = document.createElement('p')
            pieDeFotoNuevo.id = "pie-de-foto"
            pieDeFotoNuevo.innerHTML = altThumbnail
            contenedorImagenPrincipal.appendChild(pieDeFotoNuevo)
        }else {
            pieDeFoto.textContent = altThumbnail
        }



    })
} )