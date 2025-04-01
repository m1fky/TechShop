import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function SupportPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ backgroundColor: '#f9f9f9', padding: '40px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '32px', fontWeight: 'bold' }}>Контакты службы поддержки</h1>
        <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#34495e', textAlign: 'justify' }}>
          Если у вас возникли вопросы, наши специалисты всегда готовы помочь. Свяжитесь с нами любым удобным для вас способом:
        </p>
        <ul style={{ listStyleType: 'none', paddingLeft: '0', color: '#34495e', marginTop: '20px' }}>
          <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <FaPhone style={{ marginRight: '15px', color: '#e67e22', fontSize: '24px' }} />
            <span>Телефон: +7 (999) 123-45-67</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <FaEnvelope style={{ marginRight: '15px', color: '#3498db', fontSize: '24px' }} />
            <span>Email: support@techshop.com</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <FaMapMarkerAlt style={{ marginRight: '15px', color: '#2ecc71', fontSize: '24px' }} />
            <span>Адрес: ул. Ленина, 10, Москва, Россия</span>
          </li>
        </ul>
        <h2 style={{ marginTop: '30px', fontSize: '24px' }}>Часы работы</h2>
        <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#34495e', textAlign: 'justify', marginTop: '20px' }}>
          Понедельник - Пятница: 9:00 - 18:00<br />
          Суббота - Воскресенье: Выходной
        </p>
      </div>
    </div>
  );
}

export default SupportPage;
