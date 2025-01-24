const mongoose = require('mongoose');

const comparisonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  carIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  }],
  userId: {
    type: String,
    required: true
  },
  selected: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Comparison', comparisonSchema);
