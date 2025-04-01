const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Функция форматирования цены
const formatPrice = (price) => {
    return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Функция форматирования адреса
const formatAddress = (customer) => {
    const parts = [
        customer.postalCode,
        customer.region,
        customer.city,
        customer.street,
        customer.house && `${customer.house}`,
        customer.apartment && `кв. ${customer.apartment}`,
    ].filter(Boolean);

    return parts.join(', ');
};

// Шаблон письма для клиента
const customerEmailTemplate = (orderDetails) => {
    const itemsList = orderDetails.items.map(item => {
        const itemTotal = item.quantity * item.price;
        return `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${formatPrice(item.price)}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${formatPrice(itemTotal)}</td>
      </tr>
    `;
    }).join('');

    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Спасибо за ваш заказ в TechShop!</h2>
      <p>Ваш заказ № ${orderDetails.orderNumber} успешно получен и находится в обработке.</p>
      
      <h3>Детали заказа:</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #f8f9fa;">
            <th style="padding: 8px; text-align: left;">Товар</th>
            <th style="padding: 8px; text-align: center;">Кол-во</th>
            <th style="padding: 8px; text-align: right;">Цена</th>
            <th style="padding: 8px; text-align: right;">Сумма</th>
          </tr>
        </thead>
        <tbody>
          ${itemsList}
          <tr>
            <td colspan="3" style="padding: 8px; text-align: right;"><strong>Итого:</strong></td>
            <td style="padding: 8px; text-align: right;"><strong>$${formatPrice(orderDetails.total)}</strong></td>
          </tr>
        </tbody>
      </table>
      
      <h3>Детали доставки:</h3>
      <p><strong>Получатель:</strong> ${orderDetails.customer.name}</p>

      <p><strong>Адрес:</strong> ${formatAddress(orderDetails.customer)}</p>
      
      <p><strong>Номер для связи:</strong> ${orderDetails.customer.phone}</p>
      
      <p>Мы свяжемся с вами в течение дня, для уточнения метода доставки.</p>
      
      <p>С уважением,<br>Команда TechShop</p>
    </div>
  `;
};

// Шаблон письма для администратора магазина
const adminEmailTemplate = (orderDetails) => {
    const itemsList = orderDetails.items.map(item => {
        const itemTotal = item.quantity * item.price;
        return `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${formatPrice(item.price)}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${formatPrice(itemTotal)}</td>
      </tr>
    `;
    }).join('');

    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Новый заказ в TechShop!</h2>
      
      <h3>Детали заказа № ${orderDetails.orderNumber}:</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #f8f9fa;">
            <th style="padding: 8px; text-align: left;">Товар</th>
            <th style="padding: 8px; text-align: center;">Кол-во</th>
            <th style="padding: 8px; text-align: right;">Цена</th>
            <th style="padding: 8px; text-align: right;">Сумма</th>
          </tr>
        </thead>
        <tbody>
          ${itemsList}
          <tr>
            <td colspan="3" style="padding: 8px; text-align: right;"><strong>Итого:</strong></td>
            <td style="padding: 8px; text-align: right;"><strong>$${formatPrice(orderDetails.total)}</strong></td>
          </tr>
        </tbody>
      </table>
      
      <h3>Информация о покупателе:</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 4px;"><strong>ФИО:</strong></td>
          <td style="padding: 4px;">${orderDetails.customer.name}</td>
        </tr>
        <tr>
          <td style="padding: 4px;"><strong>Email:</strong></td>
          <td style="padding: 4px;">${orderDetails.customer.email}</td>
        </tr>
        <tr>
          <td style="padding: 4px;"><strong>Телефон:</strong></td>
          <td style="padding: 4px;">${orderDetails.customer.phone}</td>
        </tr>
        <tr>
          <td style="padding: 4px;"><strong>Адрес:</strong></td>
          <td style="padding: 4px;">${formatAddress(orderDetails.customer)}</td>
        </tr>
      </table>
    </div>
  `;
};

// Функция отправки email
const sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html
        });
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

// Функция отправки уведомлений о заказе
const sendOrderNotifications = async (orderDetails) => {
    try {
        // Отправка письма клиенту
        await sendEmail(
            orderDetails.customer.email,
            'Ваш заказ в TechShop подтвержден',
            customerEmailTemplate(orderDetails)
        );

        // Отправка письма администратору
        await sendEmail(
            process.env.ADMIN_EMAIL,
            'Новый заказ в TechShop',
            adminEmailTemplate(orderDetails)
        );

        return true;
    } catch (error) {
        console.error('Error sending order notifications:', error);
        return false;
    }
};

module.exports = {
    sendOrderNotifications
};