const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Получение всех продуктов
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    const transformedProducts = products.map(product => ({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
      stockQuantity: product.stockQuantity,
      specs: product.specs, // Added specs field
    }));
    res.json(transformedProducts);
  } catch (error) {
    console.error('Ошибка при получении продуктов:', error);
    res.status(500).json({ message: 'Ошибка при получении продуктов' });
  }
});

// Получение конкретного продукта
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' });
    }
    
    res.json({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
      stockQuantity: product.stockQuantity,
      specs: product.specs, // Added specs field
    });
  } catch (error) {
    console.error('Ошибка при получении товара:', error);
    res.status(500).json({ message: 'Ошибка при получении товара' });
  }
});

// Уменьшение количества товара
router.put('/:id/decrement', async (req, res) => {
  try {
    const { quantity } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' });
    }

    if (product.stockQuantity < quantity) {
      return res.status(400).json({ message: 'Недостаточно товара на складе' });
    }

    product.stockQuantity -= quantity;
    await product.save();

    res.json({ stockQuantity: product.stockQuantity });
  } catch (error) {
    console.error('Ошибка при обновлении товара:', error);
    res.status(500).json({ message: 'Ошибка при обновлении товара' });
  }
});

// Увеличение количества товара (например, при отмене заказа)
router.put('/:id/increment', async (req, res) => {
  try {
    const { quantity } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' });
    }

    product.stockQuantity += quantity;
    await product.save();

    res.json({ stockQuantity: product.stockQuantity });
  } catch (error) {
    console.error('Ошибка при обновлении товара:', error);
    res.status(500).json({ message: 'Ошибка при обновлении товара' });
  }
});

module.exports = router;
