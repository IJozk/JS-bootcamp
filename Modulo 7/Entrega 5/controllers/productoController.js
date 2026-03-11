const  Producto  = require('../models/producto');


exports.getProductos =  async (req, res) => {
        try {
            const productos = await Producto.findAll(); // Método de Sequelize para SELECT *
            res.status(200).json(productos);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener productos' });
        }
    }
exports.createProducto = async (req, res) => {
        try {
            const resultado  = await Producto.create(req.body); // Método de Sequelize para SELECT *
            res.status(200).json(resultado);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear un producto' });
        }
    }

exports.updateProducto = async (req, res) => {
        try {
            const [updatedRows] = await Producto.update(req.body, {
                where: { id: req.params.id }
            });
            if (updatedRows === 0) return res.status(404).json({ message: "No se encontró el producto" });
            res.status(200).json({ message: "Producto actualizado correctamente" });
        } catch (error) {
            res.status(500).json({ error: 'Error al modificar producto' });
        }
    }

exports.deleteProducto = async ( req, res) => {
    try{
        const deleted = await Producto.destroy({
            where: { id: req.params.id }
        });

        if (!deleted) return res.status(404).json({ message: "Producto no encontrado" });
        res.status(204).send(); // 204 No Content
    }catch(e){
        res.status(500).json({ message: "Error al eliminar", error });
    }
}
