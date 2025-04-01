const express = require('express');
const router = express.Router();
const crypto = require('crypto'); // Для генерации случайного номера
const Order = require('../models/Order'); // Импортируем модель заказа
const { sendOrderNotifications } = require('/Users/mikhailf/Desktop/TechShop/backend/сonfig/emailConfig.js');

router.post('/', async (req, res) => {
  try {
    const orderDetails = req.body;

    // Проверяем наличие корзины и элементов заказа
    if (!orderDetails.items || orderDetails.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Корзина пуста' });
    }

    // Генерация уникального номера заказа
    const date = new Date();
    const orderNumber = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}-${crypto.randomBytes(3).toString('hex')}`;

    // Создаем новый заказ
    const order = new Order({
      orderNumber,             // Уникальный номер заказа
      items: orderDetails.items, // Товары из заказа
      customer: orderDetails.customer, // Информация о клиенте
      total: orderDetails.total, // Общая сумма заказа
    });

    // Сохраняем заказ в базу данных
    await order.save();

    // Добавляем номер заказа к данным уведомления
    const notificationData = {
      ...orderDetails,
      orderNumber, // Передаем номер заказа в уведомления
    };

    // Отправка уведомлений о заказе
    const notificationsSent = await sendOrderNotifications(notificationData);

    if (!notificationsSent) {
      console.warn('Не удалось отправить уведомления о заказе');
    }

    // Успешный ответ
    res.status(201).json({
      success: true,
      message: 'Заказ успешно создан',
      order, // Возвращаем созданный заказ
    });
  } catch (error) {
    console.error('Ошибка при обработке заказа:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при обработке заказа',
    });
  }
});

module.exports = router;
