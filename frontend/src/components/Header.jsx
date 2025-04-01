import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartIcon from './cart/CartIcon';

function Header() {
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleMouseEnter = (button) => {
    setHoveredButton(button);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  return (
    <header style={headerStyles}>
      <nav style={navStyles}>
        {/* Логотип с главной страницей */}
        <div style={logoContainerStyles}>
          <Link
            to="/"
            style={{
              ...logoStyles,
              color: hoveredButton === 'logo' ? '#ddd' : '#fff', // выделяем цветом
            }}
            onMouseEnter={() => handleMouseEnter('logo')}
            onMouseLeave={handleMouseLeave}
          >
            TechShop
          </Link>
          <Link
            to="/products"
            style={{
              ...productButtonStyles,
              backgroundColor: hoveredButton === 'products' ? '#555' : '#444', // меняем фон
            }}
            onMouseEnter={() => handleMouseEnter('products')}
            onMouseLeave={handleMouseLeave}
          >
            Каталог
          </Link>
          <Link
            to="/payment"
            style={{
              ...productButtonStyles,
              backgroundColor: hoveredButton === 'payment' ? '#555' : '#444',
            }}
            onMouseEnter={() => handleMouseEnter('payment')}
            onMouseLeave={handleMouseLeave}
          >
            Доставка и оплата
          </Link>
          <Link
            to="/warranty"
            style={{
              ...productButtonStyles,
              backgroundColor: hoveredButton === 'warranty' ? '#555' : '#444',
            }}
            onMouseEnter={() => handleMouseEnter('warranty')}
            onMouseLeave={handleMouseLeave}
          >
            Гарантия
          </Link>
          <Link
            to="/support"
            style={{
              ...productButtonStyles,
              backgroundColor: hoveredButton === 'support' ? '#555' : '#444',
            }}
            onMouseEnter={() => handleMouseEnter('support')}
            onMouseLeave={handleMouseLeave}
          >
            Поддержка
          </Link>
        </div>

        {/* Корзина */}
        <div>
          <Link
            to="/cart"
            style={{
              ...linkStyles,
              position: 'relative',
              color: hoveredButton === 'cart' ? '#ddd' : '#fff', // изменяем цвет значка корзины
            }}
            onMouseEnter={() => handleMouseEnter('cart')}
            onMouseLeave={handleMouseLeave}
          >
            <CartIcon />
          </Link>
        </div>
      </nav>
    </header>
  );
}

const headerStyles = {
  backgroundColor: '#333',
  padding: '10px 20px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
};

const navStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1200px',
  margin: '0 auto',
};

const logoContainerStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
};

const logoStyles = {
  color: '#fff',
  fontSize: '24px',
  textDecoration: 'none',
  fontWeight: 'bold',
};

const productButtonStyles = {
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  padding: '5px 10px',
  borderRadius: '5px',
  backgroundColor: '#444',
  transition: 'background-color 0.3s ease, transform 0.3s ease', // добавлен эффект трансформации
};

const linkStyles = {
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  padding: '5px 10px',
  borderRadius: '5px',
  transition: 'color 0.3s ease',
};

export default Header;
