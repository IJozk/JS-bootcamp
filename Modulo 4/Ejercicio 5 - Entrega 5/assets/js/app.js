// Parte 1: Realizando Requests con XMLHttpRequest (El método clásico)
// Selecciona los Elementos: Obtén el botón cargar-xhr y el div de resultado.

// Obtener el elemento de boton para carga de datos desde la api 
// con el metodo xhr.
const cargar_xhr_btn = document.getElementById("cargar-xhr")

// Obtener el elemento de boton para carga de datos desde la api 
// con el metodo fectch.
const cargar_fetch_btn = document.getElementById("cargar-fetch")

// Obtener el elemento de div donde mostraremos el resultado en la vista.
const div_resultado = document.getElementById("resultado")

// url base para realizar consulta a la api
const url_base = "https://jsonplaceholder.typicode.com" 

let url_users = `${url_base}/users`

// Añade un Event Listener: Escucha el evento click en el botón.

cargar_xhr_btn.addEventListener("click", () =>{
  // Crear instancia de xhr
  const xhr = new XMLHttpRequest();

  // Se define que tipo de solicitud enviaremos (GET), la url donde enviaremos la solicitud y si es async o no.
  xhr.open('GET', url_users, true);

  // Tipo de respuesta esperada
  // xhr.responseType = 'json';

  // 
  xhr.onload = () => {
    if (xhr.status === 200) {
      let respuesta = JSON.parse(xhr.response)
      console.log(respuesta); // Datos recibidos
    } else {
      console.error('Error del servidor:', xhr.status);
    }
  };

  xhr.onerror = () => {
    console.error('Error de red, la petición no se envió');
  };

  xhr.send();
})


// Lógica de la Solicitud XHR: Dentro del listener del evento:

// Crea una nueva instancia de XMLHttpRequest: const xhr = new XMLHttpRequest();.

// Configura la solicitud con el método open(): xhr.open('GET', 'https://jsonplaceholder.typicode.com/users', true);.

// Define qué hacer cuando la data se reciba exitosamente con el evento onload. Dentro de esta función:

// Verifica que el estado de la respuesta sea 200 (this.status === 200).

// Convierte la respuesta de texto (JSON) a un objeto JavaScript con JSON.parse(this.responseText).

// Llama a una función (que crearás) para renderizar los usuarios en el HTML.

// Define qué hacer en caso de error con el evento onerror.

// Envía la solicitud con xhr.send().








// const xhr = new XMLHttpRequest();
// xhr.addEventListener('load', () => {
//     // Verificamos si el código de estado HTTP es exitoso (200-299).
//     if (xhr.status >= 200 && xhr.status < 300) {
//         // xhr.responseText contiene la respuesta como una cadena de texto JSON.
//         const datos = JSON.parse(xhr.responseText);
//         console.log("Datos recibidos con XHR:", datos[0].title);
//     } else {
//         console.error(`Error en la petición XHR: ${xhr.status} - ${xhr.statusText}`);
//     }
// });