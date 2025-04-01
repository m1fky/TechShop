import React from 'react';
import { FaTruck, FaCreditCard, FaGlobe } from 'react-icons/fa';

function ShippingAndPaymentPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ backgroundColor: '#f9f9f9', padding: '40px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '32px', fontWeight: 'bold' }}>Оплата и доставка</h1>
        <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Оплата</h2>
        <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#34495e', textAlign: 'justify' }}>
          <FaCreditCard style={{ marginRight: '10px', color: '#9b59b6', fontSize: '24px' }} />Мы принимаем следующие способы оплаты:
        </p>
        <ul style={{ listStyleType: 'none', paddingLeft: '0', color: '#34495e', marginTop: '20px' }}>
          <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <FaCreditCard style={{ marginRight: '15px', color: '#9b59b6', fontSize: '20px' }} />
            <span>Банковские карты: Мир.</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <FaCreditCard style={{ marginRight: '15px', color: '#9b59b6', fontSize: '20px' }} />
            <span>Электронные кошельки: PayPal, Яндекс.Деньги, QIWI.</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <FaCreditCard style={{ marginRight: '15px', color: '#9b59b6', fontSize: '20px' }} />
            <span>Наличный расчет при получении заказа.</span>
          </li>
        </ul>
        <h2 style={{ marginTop: '30px', fontSize: '24px' }}>Доставка</h2>
        <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#34495e', textAlign: 'justify' }}>
          <FaTruck style={{ marginRight: '10px', color: '#3498db', fontSize: '24px' }} />Мы предлагаем несколько вариантов доставки для вашего удобства:
        </p>
        <ul style={{ listStyleType: 'none', paddingLeft: '0', color: '#34495e', marginTop: '20px' }}>
          <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <FaTruck style={{ marginRight: '15px', color: '#3498db', fontSize: '20px' }} />
            <span>Курьерская доставка(3-7 рабочих дней).</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <FaTruck style={{ marginRight: '15px', color: '#3498db', fontSize: '20px' }} />
            <span>Доставка в пункты самовывоза(3-5 рабочих дней).</span>
          </li>
        </ul>
        <h2 style={{ marginTop: '30px', fontSize: '24px' }}>Стоимость доставки</h2>
        <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#34495e', textAlign: 'justify', marginTop: '20px' }}>
          Стоимость доставки в пункты самовывоза включена в стоимость, доставка курьером согласуется после оформления заказа по телефону в течение дня.
        </p>
      </div>
    </div>
  );
}

export default ShippingAndPaymentPage;
