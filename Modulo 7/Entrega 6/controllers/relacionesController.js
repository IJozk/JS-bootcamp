const  { Usuario, Publicacion }  = require('../models/Relaciones');


exports.getUsuarios =  async (req, res) => {
        try {
            const usuarios = await Usuario.findAll(); // Método de Sequelize para SELECT *
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener usuarios' });
        }
    }

exports.createUsuario = async (req, res) => {
        try {
            const resultado  = await Usuario.create(req.body); // Método de Sequelize para SELECT *
            res.status(200).json(resultado);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear un usuario' });
        }
    }

exports.updateUsuario = async (req, res) => {
        try {
            const [updatedRows] = await Usuario.update(req.body, {
                where: { id: req.params.id }
            });
            if (updatedRows === 0) return res.status(404).json({ message: "No se encontró el usuario" });
            res.status(200).json({ message: "Usuario actualizado correctamente" });
        } catch (error) {
            res.status(500).json({ error: 'Error al modificar usuario' });
        }
    }

exports.deleteUsuario = async ( req, res) => {
    try{
        const deleted = await Usuario.destroy({
            where: { id: req.params.id }
        });

        if (!deleted) return res.status(404).json({ message: "Usuario no encontrado" });
        res.status(204).send(); // 204 No Content
    }catch(e){
        res.status(500).json({ message: "Error al eliminar", error });
    }
}

exports.crearPublicacion =  async (req, res ) => {
        try {
            const usuario = await Usuario.findByPk(req.body.id);
            console.log(req.body.publicacion)
            const resultado  = await usuario.createPublicacione(req.body.publicacion); 
            res.status(200).json(resultado);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear un publicacion' ,  mensaje: error});
        }
    }

exports.obtenerPublicacionesXusuario =  async (req, res ) => {
        try {
            const resultado = await Usuario.findByPk(req.params.id, {
                include: Publicacion
            });
            // const resultado  = await usuario.getPublicaciones(); 
            res.status(200).json(resultado);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener publicaciones' ,  mensaje: error});
        }
    }
