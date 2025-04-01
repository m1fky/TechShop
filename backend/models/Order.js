const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true, required: true }, // Номер заказа
  items: [{
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    stockQuantity: { type: Number },
    quantity: { type: Number, required: true },
  }],
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    region: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    house: { type: String, required: true },
    apartment: { type: String },
    postalCode: { type: String, required: true },
    phone: { type: String, required: true },
  },
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

// Экспортируем модель
module.exports = mongoose.model('Order', orderSchema);
