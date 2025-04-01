const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const Product = require('./models/Product');

const app = express();

// Улучшенная конфигурация CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// Подключение к MongoDB с улучшенной обработкой ошибок
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Логгер запросов
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Основные маршруты
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
const orderRoutes = require('./routes/orders');
app.use('/api/orders', orderRoutes);

// Обновленный маршрут для уменьшения количества товара
app.put('/api/products/:id/decrement', async (req, res) => {
  console.log('Attempting to decrement product with ID:', req.params.id);
  
  try {
    const product = await Product.findById(req.params.id);
    console.log('Found product:', product);

    if (!product) {
      console.log('Product not found');
      return res.status(404).json({ message: 'Товар не найден' });
    }

    if (product.stockQuantity <= 0) {
      console.log('Product out of stock');
      return res.status(400).json({ message: 'Нет товара в наличии' });
    }

    product.stockQuantity -= 1;
    await product.save();
    
    const updatedProduct = await Product.findById(req.params.id);
    console.log('Product updated successfully');
    
    res.json({
      id: updatedProduct._id,
      name: updatedProduct.name,
      price: updatedProduct.price,
      image: updatedProduct.image,
      description: updatedProduct.description,
      category: updatedProduct.category,
      stockQuantity: updatedProduct.stockQuantity,
    });
  } catch (err) {
    console.error('Error in /decrement route:', err);
    res.status(500).json({ 
      message: 'Ошибка при обновлении товара',
      error: err.message 
    });
  }
});

// Обновленный маршрут для увеличения количества товара
app.put('/api/products/:id/increment', async (req, res) => {
  console.log('Attempting to increment product with ID:', req.params.id);
  
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      console.log('Product not found');
      return res.status(404).json({ message: 'Товар не найден' });
    }

    product.stockQuantity += 1;
    await product.save();
    
    const updatedProduct = await Product.findById(req.params.id);
    console.log('Product updated successfully');
    
    res.json({
      id: updatedProduct._id,
      name: updatedProduct.name,
      price: updatedProduct.price,
      image: updatedProduct.image,
      description: updatedProduct.description,
      category: updatedProduct.category,
      stockQuantity: updatedProduct.stockQuantity,
    });
  } catch (err) {
    console.error('Error in /increment route:', err);
    res.status(500).json({ 
      message: 'Ошибка при обновлении товара',
      error: err.message 
    });
  }
});

// Обработчик ошибок
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    message: 'Внутренняя ошибка сервера',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Запуск сервера
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV);
  console.log('CORS origin:', process.env.CORS_ORIGIN);
  console.log('MongoDB URI:', process.env.MONGODB_URI);
});