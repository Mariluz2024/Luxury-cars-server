const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car', // Referencia al modelo de "Car"
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencia al modelo de "User"
    required: true
  },
  valoracion: {
    type: Number,
    required: true,
    min: 1, // Mínimo valor permitido para la calificación
    max: 5  // Máximo valor permitido para la calificación
  }
}, {
  timestamps: true // Agrega automáticamente los campos createdAt y updatedAt
});

// Exportar el modelo
module.exports = mongoose.model('Rating', ratingSchema);
