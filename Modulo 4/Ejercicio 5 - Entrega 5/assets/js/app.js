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
const url_base = "https://aves.ninjas.cl/api" 

let url_birds = `${url_base}/birds`

// Añade un Event Listener: Escucha el evento click en el botón.

cargar_xhr_btn.addEventListener("click", () =>{
  // Crear instancia de xhr
  const xhr = new XMLHttpRequest();

  // Se define que tipo de solicitud enviaremos (GET), la url donde enviaremos la solicitud y si es async o no.
  xhr.open('GET', url_birds, true);

  // Tipo de respuesta esperada
  // xhr.responseType = 'json';

  // Manejamos la respuesta recibida
  xhr.onload = () => {
    if (xhr.status === 200) {
      let respuesta = JSON.parse(xhr.response)
      console.log(respuesta); // Datos recibidos
      agregarContenidoVista(respuesta)
    } else {
      console.error('Error del servidor:', xhr.status);
    }
  };
  // Se ejecuta cuando ocurre un error de conexion
  xhr.onerror = () => {
    console.error('Error de red, la petición no se envió');
  };
  xhr.send();
})


// Parte 2: Realizando Requests con Fetch API (El método moderno)
// Selecciona los Elementos: Obtén el botón cargar-fetch.

// Añade un Event Listener: Escucha el evento click en este botón.

// Lógica de la Solicitud Fetch: Dentro del listener del evento:

// Llama a fetch('https://jsonplaceholder.typicode.com/users').

// Encadena un primer .then() para manejar la respuesta. Verifica si la respuesta es correcta (response.ok) 
// y luego retorna la respuesta convertida a JSON: response.json().

// Encadena un segundo .then() que recibirá la data ya parseada. Pasa esta data a la misma función que 
// usaste en la Parte 1 para renderizar los usuarios.

// Encadena un .catch() al final para capturar cualquier error de red e imprimirlo en la consola.

cargar_fetch_btn.addEventListener("click", () => {
    fetch(url_birds)
    .then( response => {
      // Verificar respuesta correcta
      if (!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Convertir respuesta a json
      return response.json();
    })
    .then(data => {
      // Mostrar la data obtenida
      div_resultado.innerHTML = ""
      agregarContenidoVista(data)
      console.log(data);
    }).catch(
      console.error(error)
    )
})

const agregarContenidoVista = (arrayContenido) => {
  arrayContenido.forEach(bird => {
    console.log(`Obteniendo info desde url : ${url_birds}/${bird.uid}`)
    obtenerinfo(`${url_birds}/${bird.uid}`).then( info =>{
      if (!info.didyouknow){
        div_resultado.innerHTML +=
        `<div class="col-md-3">
          <div class="card" style="width: 18rem;">
            <img src="${bird.images.main}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${bird.name.spanish}</h5>
              <p class="card-text"> "Su nombre ya lo dice todo, que quieres saber?"</p>
            </div>
          </div>
        </div>`
        
      }else {
        div_resultado.innerHTML +=
        `<div class="col-sm-12 col-md-6 col-lg-4">
          <div class="card" style="width: 18rem;">
            <img src="${bird.images.main}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${bird.name.spanish}</h5>
              <p class="card-text">${ info.didyouknow == "" ? "Su nombre ya lo dice todo, que quieres saber?" :  info.didyouknow}</p>
              
            </div>
          </div>
        </div>`
      }
    })  
  });
}

async function obtenerinfo(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Verifica que exista antes de usar
    if (data && data.didyouknow) {
      console.log(data.didyouknow);
    } else {
      console.warn("No hay datos de 'didyouknow' para este pájaro");
    }
    return data;
  } catch (error) {
    console.error(`Error al obtener info de ${url}:`, error.message);
    return null; // Devuelve null en lugar de romper
  }
}

const apiKey = 'eQKRlwatpLGfQLlBb3TRANAXo6vm22pe';
const inputBusqueda = document.getElementById("input-busqueda");
const btnBusqueda = document.getElementById("buscar-gif");
const contImageResult = document.getElementById("gif");
const url_giphy = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}`;


btnBusqueda.addEventListener( "click" , () => {
  const palabraClave = inputBusqueda.value
  let url_busqueda = `${url_giphy}&q=${encodeURIComponent(palabraClave)}`
  fetch(url_busqueda)
  .then(response => {
    return response.json()
  })
  .then(urls => {
    if(urls.data.length > 0){
      mostrarGif(urls.data[0].images.original.url, null)
    }else{
      console.log(urls.length)
      mostrarGif(null, "No se encontro un gif")
    }
  })
  .catch(error => console.error(error));
})

const mostrarGif = (urlimage, error) => {
  if (urlimage){
    contImageResult.innerHTML = `<div class="col" id="gif">
            <img src="${urlimage}" alt="" srcset="">
        </div>`
  }else{
    contImageResult.innerHTML = `<div class="col" id="gif">
            <p>${error}</p>
        </div>`
  }
}