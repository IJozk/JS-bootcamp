module.exports = (req, res, next) => {

  /*
    Simulación de autenticación.
    - conexión a la BD
    - Ejecutar funcion comparacion de password
    -- Si el login OK >>>>>> TOKEN (numero de acceso)
    --- TOKEN lo utilizo para todas las peticiones al servidor
    ---- Si el token caduca las peticiones me mandan a pagina no-autorizado
  */

 // Cambiar a true para permitir acceso
  const usuarioAutorizado = true; 

  if (!usuarioAutorizado) {

    console.log("Acceso denegado a:", req.path);

    return res.status(403).render('no-autorizado', {
      title: 'Acceso Denegado'
    });
  }

  next();
};