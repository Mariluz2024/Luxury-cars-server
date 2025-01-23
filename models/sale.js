const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car', // Referencia al modelo "Car"
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencia al modelo "User"
    required: true
  }
}, {
  timestamps: true // Agrega automáticamente createdAt y updatedAt
});

// Exportar el modelo
module.exports = mongoose.model('Sale', saleSchema);
