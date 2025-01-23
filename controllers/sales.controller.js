const Sale = require('../models/sale'); // Asegúrate de que el modelo esté correctamente configurado

// Obtener todas las ventas
const getSales = async (req, res) => {
    try {
        const sales = await Sale.find().populate('carId userId');
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las ventas', error });
    }
};

// Obtener una venta por ID
const getSaleById = async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id).populate('carId userId');
        if (!sale) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la venta', error });
    }
};

// Crear una nueva venta
const createSale = async (req, res) => {
    try {
        const { carId, userId } = req.body;

        const newSale = new Sale({ carId, userId });
        await newSale.save();
        res.status(201).json(newSale);
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar la venta', error });
    }
};

// Actualizar una venta existente
const updateSale = async (req, res) => {
    try {
        const { id } = req.params;
        const { carId, userId } = req.body;

        const updatedSale = await Sale.findByIdAndUpdate(
            id,
            { carId, userId },
            { new: true } // Devuelve el objeto actualizado
        );

        if (!updatedSale) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        res.status(200).json(updatedSale);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la venta', error });
    }
};

// Eliminar una venta
const deleteSale = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSale = await Sale.findByIdAndDelete(id);

        if (!deletedSale) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        res.status(200).json({ message: 'Venta eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la venta', error });
    }
};

module.exports = {
    getSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale,
};
