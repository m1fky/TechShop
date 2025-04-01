import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function TechShop() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{
        backgroundColor: '#f9f9f9',
        padding: '40px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>Добро пожаловать в TechShop!</h1>
        <p style={{ fontSize: '18px', color: '#555', marginBottom: '30px' }}>
          Здесь вы найдете лучшие процессоры на рынке. Ознакомьтесь с нашими продуктами!
        </p>
        <Link 
          to="/products" 
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            fontSize: '16px',
            color: '#fff',
            backgroundColor: isHovered ? '#0056b3' : '#007BFF',
            textDecoration: 'none',
            borderRadius: '5px',
            transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            boxShadow: isHovered ? '0 4px 12px rgba(0, 91, 255, 0.3)' : 'none',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Перейти к продуктам
        </Link>
      </div>
    </div>
  );
}

export default TechShop;
