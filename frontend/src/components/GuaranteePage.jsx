import React from 'react';
import { FaRegHandshake, FaPhone, FaRegClock } from 'react-icons/fa';

function GuaranteePage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ backgroundColor: '#f9f9f9', padding: '40px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '32px', fontWeight: 'bold' }}>Гарантия</h1>
        <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#34495e', textAlign: 'justify' }}>
          <FaRegHandshake style={{ marginRight: '10px', color: '#3498db', fontSize: '24px' }} />Мы предоставляем гарантию на все наши товары. Наша гарантия распространяется на производственные дефекты в течение 12 месяцев с момента покупки.
        </p>
        <h2 style={{ marginTop: '30px', fontSize: '24px' }}>Условия гарантии</h2>
        <ul style={{ listStyleType: 'none', paddingLeft: '0', color: '#34495e', marginTop: '20px' }}>
          <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <FaRegClock style={{ marginRight: '15px', color: '#2ecc71', fontSize: '20px' }} />
            <span>Товар должен быть использован согласно инструкции.</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <FaRegClock style={{ marginRight: '15px', color: '#2ecc71', fontSize: '20px' }} />
            <span>Гарантия не распространяется на повреждения, вызванные неправильной эксплуатацией.</span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <FaRegClock style={{ marginRight: '15px', color: '#2ecc71', fontSize: '20px' }} />
            <span>Для обращения по гарантии необходимо сохранить чек или иной документ, подтверждающий покупку.</span>
          </li>
        </ul>
        <h2 style={{ marginTop: '30px', fontSize: '24px' }}>Как воспользоваться гарантией?</h2>
        <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#34495e', textAlign: 'justify', marginTop: '20px' }}>
          <FaPhone style={{ marginRight: '10px', color: '#e67e22', fontSize: '24px' }} />Свяжитесь с нашей службой поддержки по телефону или электронной почте, указав номер заказа и описание проблемы. Мы быстро обработаем ваш запрос и предложим решение.
        </p>
      </div>
    </div>
  );
}

export default GuaranteePage;
