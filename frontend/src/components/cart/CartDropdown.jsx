import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import CartItem from './CartItem';

function CartDropdown() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div
        style={{
          maxWidth: '1160px', // Ширина главного контейнера
          margin: '20px auto',
          padding: '40px',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Корзина пуста</h2>
        <p style={{ fontSize: '18px', color: '#555' }}>Добавьте товары в корзину</p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: '1160px', // Убедимся, что ширина такая же, как в остальных блоках
        minHeight: '400px',
        margin: '20px auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        display: 'flex',
        gap: '20px',
      }}
    >
      {/* Левая часть (товары в корзине) */}
      <div style={{ flex: 2 }}>
        <h2 style={{ textAlign: 'left', marginBottom: '20px', fontSize: '28px' }}>Корзина</h2>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* Правая часть (итоговая сумма и кнопка) */}
      <div
        style={{
          position: 'relative',
          top: '73px',
          width: '400px',
          maxHeight: '250px', // Ограничиваем максимальную высоту правого блока
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <div>
          <h3 style={{ fontSize: '22px', marginBottom: '20px', textAlign: 'center' }}>
            Итоговая сумма
          </h3>
          <p
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#333',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            ${total.toFixed(2)}
          </p>
        </div>
        <button
          onClick={() => navigate('/checkout')}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '18px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
}

export default CartDropdown;
