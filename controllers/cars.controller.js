const Car = require('../models/car'); // Asegúrate de que el modelo esté correctamente configurado

// Obtener todos los coches
const getCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los coches', error });
    }
};

// Obtener un coche por ID
const getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Coche no encontrado' });
        }
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el coche', error });
    }
};

// Crear un nuevo coche
const createCar = async (req, res) => {
    try {
        const { name, description, price, hp } = req.body;
        const newCar = new Car({ name, description, price, hp });
        await newCar.save();
        res.status(201).json(newCar);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el coche', error });
    }
};

// Actualizar un coche existente
const updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, hp } = req.body;

        const updatedCar = await Car.findByIdAndUpdate(
            id,
            { name, description, price, hp },
            { new: true } // Devuelve el objeto actualizado
        );

        if (!updatedCar) {
            return res.status(404).json({ message: 'Coche no encontrado' });
        }

        res.status(200).json(updatedCar);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el coche', error });
    }
};

// Eliminar un coche
const deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCar = await Car.findByIdAndDelete(id);

        if (!deletedCar) {
            return res.status(404).json({ message: 'Coche no encontrado' });
        }

        res.status(200).json({ message: 'Coche eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el coche', error });
    }
};

module.exports = {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
};
