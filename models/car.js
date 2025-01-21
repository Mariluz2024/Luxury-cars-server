const mongoose = require('mongoose');

// Definir el esquema para la colección "cars"
const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    hp: {
        type: Number,
        required: true,
    },
    model: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true, // Agrega automáticamente createdAt y updatedAt
});

// Crear el modelo basado en el esquema
const Car = mongoose.model('Car', carSchema);

module.exports = Car;
