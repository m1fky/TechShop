import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function ProductCard({ id, name, price, image, stockQuantity }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);  // Состояние для уведомления
  const [addCount, setAddCount] = useState(0);  // Состояние для подсчета количества добавлений
  
  const handleClick = () => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (stockQuantity <= 0) {
      alert('Товар распродан!');
      return;
    }
    addToCart({ id, name, price, image, stockQuantity });
    
    setAddCount(prevCount => prevCount + 1);  // Увеличиваем количество добавлений
    setIsAdded(true);  // Показываем уведомление

    setTimeout(() => {
      setIsAdded(false);  // Скрываем уведомление через 3 секунды
    }, 3000);
  };

  return (
    <div
      className="product-card"
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        backgroundColor: isHovered ? '#f1f1f1' : 'white',
        transition: 'background-color 0.2s',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2
        style={{
          color: isHovered ? '#007bff' : 'black',
          transition: 'color 0.2s',
        }}
      >
        {name}
      </h2>
      <img src={image} alt={name} style={{ maxWidth: '200px' }} />
      <p>${price}</p>
      <p style={{ color: stockQuantity > 0 ? 'green' : 'red', fontWeight: 'bold' }}>
        {stockQuantity > 0 ? `В наличии: ${stockQuantity}` : 'Нет в наличии'}
      </p>
      <button
        onClick={handleAddToCart}
        disabled={stockQuantity === 0}
        style={{
          backgroundColor: stockQuantity > 0 ? '#007bff' : '#cccccc',
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          cursor: stockQuantity > 0 ? 'pointer' : 'not-allowed',
          transition: 'transform 0.2s, background-color 0.2s',
        }}
        onMouseEnter={(e) => {
          if (stockQuantity > 0) {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.backgroundColor = '#0056b3';
          }
        }}
        onMouseLeave={(e) => {
          if (stockQuantity > 0) {
            e.target.style.transform = 'scale(1)';
            e.target.style.backgroundColor = '#007bff';
          }
        }}
      >
        Добавить в корзину
      </button>
      
      {isAdded && (
        <div
          style={{
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#28a745',
            color: 'white',
            borderRadius: '4px',
            textAlign: 'center',
          }}
        >
          {addCount > 1 ? `Товар добавлен в корзину x${addCount}` : 'Товар добавлен в корзину!'}
        </div>
      )}
    </div>
  );
}

export default ProductCard;
