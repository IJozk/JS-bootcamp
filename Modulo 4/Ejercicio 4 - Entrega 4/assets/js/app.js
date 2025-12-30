/*
  Simulación de Funciones de API
  Estas funciones simulan llamadas a una red. No las modifiques.
*/

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
        return;
    }
    obtenerPosts(usuario.id, (errorPosts, posts) => {
      if (errorPosts) {
        console.error(errorPosts);
        return;
      }
      const primerPost = posts[0];
      obtenerComentarios(primerPost.id, (errorComentarios, comentarios) => {
      if (errorComentarios) {
        console.error(errorComentarios);
        return;
      }
        console.log("Comentarios obtenidos del post:", comentarios);
        console.log("---------------------------------")
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
    }, demora);
  })
  
};

// API para obtener los posts de un usuario
const newObtenerPosts = (userId) => {
  const demora = Math.random() * 1000 + 500;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!userId) {
        reject("Error: ID de usuario no proporcionado para buscar posts.");
      } else {
        console.log(`Buscando posts del usuario con ID: ${userId}...`);
        const posts = [
          { id: 101, titulo: "Mi primer post", contenido: "..." },
          { id: 102, titulo: "Mi segundo post", contenido: "..." },
        ];
        resolve(posts);
      }
    }, demora )}
  )
};

// API para obtener los comentarios de un post
const newObtenerComentarios = (postId) => {
  const demora = Math.random() * 1000 + 500;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!postId) {
        reject(
          "Error: ID de post no proporcionado para buscar comentarios.");
      } else{
        console.log(`Buscando comentarios del post con ID: ${postId}...`);
        const comentarios = [
          { id: 1, texto: "¡Excelente post!" },
          { id: 2, texto: "Muy informativo, gracias." },
        ];
        resolve(comentarios);
      }
    }, demora);
  })
  
};

function pruebasPromesas(){
  newObtenerUsuario(1)
  .then(usuario =>{ 
    newObtenerPosts(usuario.id)
    .then(posts => {newObtenerComentarios(posts[0].id)
      .then(comentarios => {
        comentarios.forEach(comentario => {
          console.log(`Comentario id:${comentario.id} contiene el texto: ${comentario.texto} `)
        });
      })
      .catch(error => {console.log(`Error encontrado: \n ${error}`)})
    })
  })
}

async function pruebaAsync() {
    try {
        console.log("Iniciando obtención de datos...");
        const user = await newObtenerUsuario(1);
        console.log(`El nombre de la organización es: ${user.id}`);

        const posts = await newObtenerPosts(user.id);

        const comentarios = await newObtenerComentarios(posts[0].id);

        comentarios.forEach( comentario => {
          console.log("ID comentario: "+comentario.id + "\n" + comentario.texto)
        })

    } catch (error) {
        console.error("Error codigo " + error.status + ". \nFalló la operación asíncrona: "+ error.message);
    } finally {
        console.log("Proceso async/await finalizado.");
    }
}

const pruebas = () => {
  setTimeout(() => {
      console.log("---------------------------------")
      console.log("Prueba de funciones con Callbacks")
      console.log("---------------------------------")
      pruebasCallbacks()
    }, 3000)
  setTimeout(() => {
      console.log("---------------------------------")
      console.log("Prueba de funciones con Promises ")
      console.log("---------------------------------")
      pruebasPromesas()
    }, 6000)
  setTimeout(() => {
      console.log("---------------------------------")
      console.log("Prueba de funciones con Async/Await ")
      console.log("---------------------------------")
      pruebasPromesas()
    }, 9000)
  
}

pruebas()