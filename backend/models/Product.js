const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  stockQuantity: { type: Number, required: true, default: 0 },
  specs: { type: Object, default: {} },
});

module.exports = mongoose.model('Product', productSchema);