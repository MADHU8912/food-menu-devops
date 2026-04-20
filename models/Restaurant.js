const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const restaurantSchema = new mongoose.Schema({
  name: String,
  category: String,
  items: [itemSchema]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);