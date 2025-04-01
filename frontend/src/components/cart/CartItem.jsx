import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

function CartItem({ item }) {
  const { addToCart, removeFromCart, clearFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/products/${item.id}`);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px',
        marginBottom: '15px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        maxWidth: '1200px', // Ограничиваем максимальную ширину для consistency
        boxSizing: 'border-box', // Учитываем паддинги при вычислении ширины
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div
        onClick={handleProductClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          cursor: 'pointer',
        }}
      >
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: '100px',  // Установим фиксированную ширину для изображения
            height: '100px', // Тоже фиксированная высота
            objectFit: 'contain',
            borderRadius: '8px',
            marginRight: '15px',
          }}
        />
        <div>
          <h3
            style={{
              fontSize: '18px',
              color: '#007bff',
              textDecoration: 'underline',
              margin: 0,
            }}
          >
            {item.name}
          </h3>
          <p style={{ margin: '5px 0', fontSize: '16px', color: '#555' }}>
            Цена: ${item.price}
          </p>
          <p style={{ margin: '5px 0', fontSize: '16px', color: '#555' }}>
            Итого: ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={() => removeFromCart(item.id)}
          style={{
            backgroundColor: '#ffc107',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 12px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          -
        </button>
        <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
          {item.quantity}
        </span>
        <button
          onClick={() => addToCart(item)}
          style={{
            backgroundColor: '#28a745',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 12px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          +
        </button>
        <button
          onClick={() => clearFromCart(item.id)}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 15px',
            cursor: 'pointer',
          }}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}

export default CartItem;
