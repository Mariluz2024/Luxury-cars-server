const Favorite = require('../models/favorite');

const getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find().populate('carId userId');
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los favoritos', error });
    }
};

const getFavoriteById = async (req, res) => {
    try {
        const favorite = await Favorite.findById(req.params.id).populate('carId userId');
        if (!favorite) {
            return res.status(404).json({ message: 'Favorito no encontrado' });
        }
        res.status(200).json(favorite);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el favorito', error });
    }
};

const createFavorite = async (req, res) => {
    try {
        const { carId, userId } = req.body;

        // Verificar si el favorito ya existe
        const existingFavorite = await Favorite.findOne({ carId, userId });
        if (existingFavorite) {
            return res.status(400).json({ message: 'El favorito ya existe' });
        }

        const newFavorite = new Favorite({ carId, userId });
        await newFavorite.save();
        res.status(201).json(newFavorite);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el favorito', error });
    }
};

const deleteFavorite = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFavorite = await Favorite.findByIdAndDelete(id);

        if (!deletedFavorite) {
            return res.status(404).json({ message: 'Favorito no encontrado' });
        }

        res.status(200).json({ message: 'Favorito eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el favorito', error });
    }
};

// Eliminar un favorito por coche y usuario
const deleteFavoriteByCarAndUser = async (req, res) => {
    try {
        const { carId, userId } = req.body;

        const deletedFavorite = await Favorite.findOneAndDelete({ carId, userId });

        if (!deletedFavorite) {
            return res.status(404).json({ message: 'Favorito no encontrado para el coche y usuario proporcionados' });
        }

        res.status(200).json({ message: 'Favorito eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el favorito', error });
    }
};

const mongoose = require('mongoose');

const getFavoriteByUserId = async (req, res) => {
    try {
        const { id } = req.params;

        const objectId = new mongoose.Types.ObjectId(id);

        const favorites = await Favorite.find().populate('carId userId');

        const userFavorites = favorites.filter(favorite => favorite.userId._id.equals(objectId));

        res.status(200).json(userFavorites);
    } catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).json({ message: 'Error al obtener los favoritos', error });
    }
};

module.exports = {
    getFavorites,
    getFavoriteById,
    createFavorite,
    deleteFavorite,
    deleteFavoriteByCarAndUser,
    getFavoriteByUserId
};
