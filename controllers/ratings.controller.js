const Rating = require('../models/rating'); // Asegúrate de que el modelo esté correctamente configurado

// Obtener todas las valoraciones
const getRatings = async (req, res) => {
    try {
        const ratings = await Rating.find().populate('carId userId');
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las valoraciones', error });
    }
};

// Obtener una valoración por ID
const getRatingById = async (req, res) => {
    try {
        const rating = await Rating.findById(req.params.id).populate('carId userId');
        if (!rating) {
            return res.status(404).json({ message: 'Valoración no encontrada' });
        }
        res.status(200).json(rating);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la valoración', error });
    }
};

// Crear una nueva valoración
const createRating = async (req, res) => {
    try {
        const { carId, userId, valoracion } = req.body;

        if (valoracion < 1 || valoracion > 5) {
            return res.status(400).json({ message: 'La valoración debe estar entre 1 y 5' });
        }

        const newRating = new Rating({ carId, userId, valoracion });
        await newRating.save();
        res.status(201).json(newRating);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la valoración', error });
    }
};

// Actualizar una valoración existente
const updateRating = async (req, res) => {
    try {
        const { id } = req.params;
        const { valoracion } = req.body;

        if (valoracion < 1 || valoracion > 5) {
            return res.status(400).json({ message: 'La valoración debe estar entre 1 y 5' });
        }

        const updatedRating = await Rating.findByIdAndUpdate(
            id,
            { valoracion },
            { new: true } // Devuelve el objeto actualizado
        );

        if (!updatedRating) {
            return res.status(404).json({ message: 'Valoración no encontrada' });
        }

        res.status(200).json(updatedRating);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la valoración', error });
    }
};

// Eliminar una valoración
const deleteRating = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRating = await Rating.findByIdAndDelete(id);

        if (!deletedRating) {
            return res.status(404).json({ message: 'Valoración no encontrada' });
        }

        res.status(200).json({ message: 'Valoración eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la valoración', error });
    }
};

module.exports = {
    getRatings,
    getRatingById,
    createRating,
    updateRating,
    deleteRating,
};
