/*
  Simulación de Funciones de API
  Estas funciones simulan llamadas a una red. No las modifiques.
*/

const callbacks = document.getElementById("callbacks")
const promises = document.getElementById("promises")
const asyncAwait = document.getElementById("async-await")

// API para obtener datos de un usuario
const obtenerUsuario = (id, callback) => {
  // Simula una demora aleatoria entre 0.5 y 1.5 segundos
  const demora = Math.random() * 1000 + 500;
  setTimeout(() => {
    // Simula un posible error
    if (!id) {
      callback("Error: ID de usuario no proporcionado.", null);
      return;
    }
    console.log(`Buscando usuario con ID: ${id}...`);
    callbacks.innerHTML += `Buscando usuario con ID: ${id}...\n`
    const usuario = {
      id: id,
      nombre: "John Doe",
      email: "john.doe@example.com",
    };
    callback(null, usuario);
  }, demora);
};

// API para obtener los posts de un usuario
const obtenerPosts = (userId, callback) => {
  const demora = Math.random() * 1000 + 500;
  setTimeout(() => {
    if (!userId) {
      callback(
        "Error: ID de usuario no proporcionado para buscar posts.",
        null
      );
      return;
    }
    console.log(`Buscando posts del usuario con ID: ${userId}...`);
    callbacks.innerHTML += `Buscando posts del usuario con ID: ${userId}...\n`
    const posts = [
      { id: 101, titulo: "Mi primer post", contenido: "..." },
      { id: 102, titulo: "Mi segundo post", contenido: "..." },
    ];
    callback(null, posts);
  }, demora);
};

// API para obtener los comentarios de un post
const obtenerComentarios = (postId, callback) => {
  const demora = Math.random() * 1000 + 500;
  setTimeout(() => {
    if (!postId) {
      callback(
        "Error: ID de post no proporcionado para buscar comentarios.",
        null
      );
      return;
    }
    console.log(`Buscando comentarios del post con ID: ${postId}...`);
    callbacks.innerHTML += `Buscando comentarios del post con ID: ${postId}...\n`
    const comentarios = [
      { id: 1, texto: "¡Excelente post!" },
      { id: 2, texto: "Muy informativo, gracias." },
    ];
    callback(null, comentarios);
  }, demora);
};

// Parte 1: La Solución con Callbacks (El "Callback Hell")
// Llama a la función obtenerUsuario con un ID de tu elección (ej: 1).

// Dentro del callback de obtenerUsuario, una vez que tengas el objeto usuario, llama a obtenerPosts usando el usuario.id.

// Dentro del callback de obtenerPosts, una vez que tengas el array de posts, llama a obtenerComentarios usando el id del primer post (posts[0].id).

// Finalmente, dentro del callback de obtenerComentarios, imprime en la consola los comentarios obtenidos.

// Asegúrate de manejar los posibles errores en cada paso, imprimiendo el error en la consola si ocurre.

// Observa la estructura anidada que se forma. Esto es conocido como "Callback Hell" o "Pyramid of Doom".

function pruebasCallbacks(){
  obtenerUsuario( 1 , (errorUser, usuario) => {
    if (errorUser) {
        console.error(errorUser);
        callbacks.innerHTML += errorUser
        return;
    }
    obtenerPosts(usuario.id, (errorPosts, posts) => {
      if (errorPosts) {
        console.error(errorPosts);
        callbacks.innerHTML += errorPosts
        return;
      }
      const primerPost = posts[0];
      obtenerComentarios(primerPost.id, (errorComentarios, comentarios) => {
      if (errorComentarios) {
        console.error(errorComentarios);
        callbacks.innerHTML += errorComentarios
        return;
      }
        let comentariosDetalle = ""
        comentarios.forEach( comentario => {
          comentariosDetalle += `Comentario id: ${comentario.id}, texto: ${comentario.texto}\n`
        })
        console.log("Comentarios obtenidos del post:", comentarios);
        console.log("---------------------------------")
        callbacks.innerHTML += `Comentarios obtenidos del post: \n${comentariosDetalle}
        ---------------------------------`
      });
    });
  });
}




// API para obtener datos de un usuario
const newObtenerUsuario = (id) => {
  // Simula una demora aleatoria entre 0.5 y 1.5 segundos
  const demora = Math.random() * 1000 + 500;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simula un posible error
      if (!id) {
        let error = {
          status: 400,
          message: "Error: ID de usuario no proporcionado."
        }
        reject(error);
      } else{
        const usuario = {
          id: id,
          nombre: "John Doe",
          email: "john.doe@example.com",
        };
        resolve(usuario)
      }
    }, 1000);
  })
  
};

// API para obtener los posts de un usuario
const newObtenerPosts = (userId, isPromise) => {
  const demora = Math.random() * 1000 + 500;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!userId) {
        reject("Error: ID de usuario no proporcionado para buscar posts.");
      } else {
        if (isPromise){
          console.log(`Buscando posts del usuario con ID: ${userId}...`);
          promises.innerHTML += `Buscando posts del usuario con ID: ${userId}...\n`
        }
        const posts = [
          { id: 101, titulo: "Mi primer post", contenido: "..." },
          { id: 102, titulo: "Mi segundo post", contenido: "..." },
        ];
        resolve(posts);
      }
    }, 2000);
  });
};

// API para obtener los comentarios de un post
const newObtenerComentarios = (postId, isPromise) => {
  const demora = Math.random() * 1000 + 500;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!postId) {
        reject(
          "Error: ID de post no proporcionado para buscar comentarios.");
      } else{
        if (isPromise){
          console.log(`Buscando comentarios del post con ID: ${postId}...`);
          promises.innerHTML += `Buscando comentarios del post con ID: ${postId}...\n`
        }
        const comentarios = [
          { id: 1, texto: "¡Excelente post!" },
          { id: 2, texto: "Muy informativo, gracias." },
        ];
        resolve(comentarios);
      }
    }, 3000);
  })
  
};

function pruebasPromesas(){
  newObtenerUsuario(1)
  .then(usuario => newObtenerPosts(usuario.id, true))
  .then(posts => newObtenerComentarios(posts[0].id, true))
  .then(comentarios => {
        comentarios.forEach(comentario => {
          console.log(`Comentario id:${comentario.id} contiene el texto: ${comentario.texto} `)
          promises.innerHTML += `Comentario id:${comentario.id} contiene el texto: ${comentario.texto} \n`
        });
        promises.innerHTML += "      ---------------------------------"
  }).catch(error => {console.log(`Error encontrado: \n ${error}`) 
    promises.innerHTML += `Error encontrado: \n ${error}\n`})
  }

async function pruebaAsync() {
    try {
        console.log("Iniciando obtención de datos...");
        asyncAwait.innerHTML += "Iniciando obtención de datos...\n"
        const user = await newObtenerUsuario(1);
        console.log(`El nombre de la organización es: ${user.id}`);
        asyncAwait.innerHTML += `El nombre de la organización es: ${user.id}\n`

        const posts = await newObtenerPosts(user.id, false);

        const comentarios = await newObtenerComentarios(posts[0].id, false);

        comentarios.forEach( comentario => {
          console.log("ID comentario: "+comentario.id + "\n" + comentario.texto)
          asyncAwait.innerHTML += "ID comentario: "+comentario.id + "\n" + comentario.texto + "\n"
        })

    } catch (error) {
        console.error("Error codigo " + error.status + ". \nFalló la operación asíncrona: "+ error.message);
    } finally {
        console.log("Proceso async/await finalizado.");
        asyncAwait.innerHTML += "Proceso async/await finalizado.\n"
        asyncAwait.innerHTML +=   "        ---------------------------------"
    }
}

const pruebas = () => {
  setTimeout(() => {
      callbacks.innerHTML += `
      ---------------------------------
      Prueba de funciones con Callbacks
      ---------------------------------\n`
      pruebasCallbacks()
    }, 1000)
  setTimeout(() => {
      promises.innerHTML += `
      ---------------------------------
      Prueba de funciones con Promises
      ---------------------------------\n`
      console.log("---------------------------------")
      console.log("Prueba de funciones con Promises ")
      console.log("---------------------------------")
      pruebasPromesas()
    }, 8000)
  setTimeout(() => {
      asyncAwait.innerHTML += `
      ---------------------------------
      Prueba de funciones con Async/Await
      ---------------------------------\n`
      console.log("---------------------------------")
      console.log("Prueba de funciones con Async/Await ")
      console.log("---------------------------------")
      pruebaAsync()
    }, 15000)

}

pruebas()