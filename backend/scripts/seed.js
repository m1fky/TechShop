const mongoose = require('mongoose');
const Product = require('../models/Product');

const processors = [
  {
    name: "ZypherCore 5000X",
    description: "Мощный процессор для игр с поддержкой всех последних технологий.",
    price: 499.99,
    category: "Процессоры",
    image: "https://via.placeholder.com/400x300",
    inStock: true,
    stockQuantity: 100, // Количество товара на складе
    specs: {
      cores: 8,
      threads: 16,
      baseClock: "3.8 GHz",
      turboClock: "5.0 GHz",
      TDP: "95W",
      chipset: "Z-5000",
      architecture: "X-Arch 3.0",
    },
  },
  {
    name: "ZypherCore 4000X",
    description: "Процессор среднего уровня с отличной производительностью для рабочих станций.",
    price: 399.99,
    category: "Процессоры",
    image: "https://via.placeholder.com/400x300",
    inStock: true,
    stockQuantity: 75, // Количество товара на складе
    specs: {
      cores: 6,
      threads: 12,
      baseClock: "3.5 GHz",
      turboClock: "4.6 GHz",
      TDP: "80W",
      chipset: "Z-4000",
      architecture: "X-Arch 2.5",
    },
  },
  {
    name: "ZypherCore 3000X",
    description: "Бюджетный процессор для офисных и домашних пользователей.",
    price: 299.99,
    category: "Процессоры",
    image: "https://via.placeholder.com/400x300",
    inStock: true,
    stockQuantity: 120, // Количество товара на складе
    specs: {
      cores: 4,
      threads: 8,
      baseClock: "3.2 GHz",
      turboClock: "4.2 GHz",
      TDP: "65W",
      chipset: "Z-3000",
      architecture: "X-Arch 2.0",
    },
  },
  {
    name: "ZypherCore 2000X",
    description: "Энергоэффективный процессор для экономичных сборок.",
    price: 199.99,
    category: "Процессоры",
    image: "https://via.placeholder.com/400x300",
    inStock: true,
    stockQuantity: 200, // Количество товара на складе
    specs: {
      cores: 4,
      threads: 4,
      baseClock: "2.8 GHz",
      turboClock: "3.5 GHz",
      TDP: "45W",
      chipset: "Z-2000",
      architecture: "X-Arch 1.5",
    },
  },
  {
    name: "HyperCore 1000K",
    description: "Процессор для встраиваемых систем с малым энергопотреблением.",
    price: 149.99,
    category: "Процессоры",
    image: "https://via.placeholder.com/400x300",
    inStock: true,
    stockQuantity: 50, // Количество товара на складе
    specs: {
      cores: 2,
      threads: 4,
      baseClock: "2.4 GHz",
      turboClock: "3.0 GHz",
      TDP: "35W",
      chipset: "H-1000",
      architecture: "H-Arch 1.0",
    },
  },
  {
    name: "HyperCore 5000K",
    description: "Процессор для серверов с поддержкой многозадачности и высокой производительности.",
    price: 699.99,
    category: "Процессоры",
    image: "https://via.placeholder.com/400x300",
    inStock: true,
    stockQuantity: 30, // Количество товара на складе
    specs: {
      cores: 16,
      threads: 32,
      baseClock: "2.9 GHz",
      turboClock: "4.0 GHz",
      TDP: "150W",
      chipset: "H-5000",
      architecture: "H-Arch 3.0",
    },
  },
  {
    name: "QuantumCore 7000X",
    description: "Процессор для рабочих станций с лучшей производительностью для рендеринга и 3D.",
    price: 899.99,
    category: "Процессоры",
    image: "https://via.placeholder.com/400x300",
    inStock: true,
    stockQuantity: 60, // Количество товара на складе
    specs: {
      cores: 12,
      threads: 24,
      baseClock: "3.5 GHz",
      turboClock: "4.8 GHz",
      TDP: "125W",
      chipset: "Q-7000",
      architecture: "Q-Arch 4.0",
    },
  },
  {
    name: "QuantumCore 8000X",
    description: "Процессор для суперкомпьютеров с максимальной мощностью для сложных вычислений.",
    price: 1299.99,
    category: "Процессоры",
    image: "https://via.placeholder.com/400x300",
    inStock: true,
    stockQuantity: 25, // Количество товара на складе
    specs: {
      cores: 20,
      threads: 40,
      baseClock: "4.0 GHz",
      turboClock: "5.2 GHz",
      TDP: "180W",
      chipset: "Q-8000",
      architecture: "Q-Arch 5.0",
    },
  },
  {
    name: "QuantumCore 9000X",
    description: "Процессор нового поколения с невероятной производительностью и поддержкой искусственного интеллекта.",
    price: 1599.99,
    category: "Процессоры",
    image: "https://via.placeholder.com/400x300",
    inStock: true,
    stockQuantity: 40, // Количество товара на складе
    specs: {
      cores: 24,
      threads: 48,
      baseClock: "4.5 GHz",
      turboClock: "5.5 GHz",
      TDP: "200W",
      chipset: "Q-9000",
      architecture: "Q-Arch 6.0",
    },
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/techshop');
    
    // Очищаем существующие продукты
    await Product.deleteMany({});
    
    // Добавляем новые продукты (включая процессоры)
    await Product.insertMany(processors);
    
    console.log('База данных успешно заполнена!');
    process.exit(0);
  } catch (error) {
    console.error('Ошибка при заполнении базы данных:', error);
    process.exit(1);
  }
}

seedDatabase();
