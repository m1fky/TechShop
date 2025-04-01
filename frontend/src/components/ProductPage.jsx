import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { apiRequest } from '../api';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addCount, setAddCount] = useState(0);  // Состояние для отслеживания количества добавлений
  const [isAdded, setIsAdded] = useState(false); // Состояние для показа уведомления

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await apiRequest(`/products/${id}`);
        setProduct(data);
        setSelectedImage(data.image); // устанавливаем основное изображение при загрузке товара
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    try {
      if (product.stockQuantity <= 0) {
        throw new Error('Товар распродан!');
      }

      addToCart({ 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        image: product.image,
        stockQuantity: product.stockQuantity 
      });

      setAddCount(prevCount => prevCount + 1); // увеличиваем количество добавлений
      setIsAdded(true); // показываем уведомление

      setTimeout(() => {
        setIsAdded(false); // скрываем уведомление через 3 секунды
      }, 3000);
      
    } catch (error) {
      alert(error.message);
    }
  };

  const handleImageClick = () => {
    setIsModalOpen(true); // открываем модальное окно
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // закрываем модальное окно
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!product) return <div>Товар не найден</div>;

  return (
    <div className="product-page" style={{ backgroundColor: '#f9f9f9', padding: '40px 20px' }}>
      {/* Контейнер с максимальной шириной, чтобы сделать страницу одинаковой ширины */}
      <div className="product-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="product-content" style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          
          {/* Вертикальная карусель (с одним изображением) */}
          <div className="product-carousel" style={{ flex: 0.2, display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto', maxHeight: '400px' }}>
            <img 
              src={product.image} 
              alt={product.name}
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'cover',
                cursor: 'pointer',
                marginBottom: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                transition: 'transform 0.3s',
              }}
              onClick={() => setSelectedImage(product.image)} // обновляем изображение при клике
            />
          </div>

          {/* Главное изображение товара */}
          <div className="product-image" style={{ flex: 0.7, display: 'flex', justifyContent: 'center' }}>
            <img 
              src={selectedImage} 
              alt={product.name} 
              style={{ maxWidth: '300px', objectFit: 'contain', margin: '0 auto', cursor: 'pointer' }} 
              onClick={handleImageClick} // открытие модального окна по клику на изображение
            />
          </div>

          {/* Информация о товаре */}
          <div className="product-info" style={{ flex: 0.6 }}>
            <h1 style={{ fontSize: '28px', fontWeight: '600', color: '#333' }}>{product.name}</h1>
            <p className="price" style={{ fontSize: '24px', color: '#000' }}>${product.price}</p>
            <p className="description" style={{ color: '#5f5f5f' }}>{product.description}</p>
            <div className="stock-status">
              <p style={{ color: product.stockQuantity > 0 ? '#4CAF50' : '#f44336', fontWeight: 'bold' }}>
                {product.stockQuantity > 0 
                  ? `В наличии: ${product.stockQuantity}` 
                  : "Нет в наличии"}
              </p>
            </div>
            <div className="product-actions" style={{ marginTop: '20px' }}>
              <button
                onClick={handleAddToCart}
                disabled={product.stockQuantity === 0}
                style={{
                  backgroundColor: product.stockQuantity > 0 ? '#007bff' : '#cccccc',
                  color: 'white',
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: product.stockQuantity > 0 ? 'pointer' : 'not-allowed',
                  transition: 'transform 0.3s, background-color 0.3s',
                }}
                onMouseEnter={(e) => {
                  if (product.stockQuantity > 0) {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.backgroundColor = '#0056b3'; // темно-синий
                  }
                }}
                onMouseLeave={(e) => {
                  if (product.stockQuantity > 0) {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.backgroundColor = '#007bff'; // оригинальный синий цвет
                  }
                }}
              >
                {product.stockQuantity > 0 ? "Добавить в корзину" : "Нет в наличии"}
              </button>
            </div>
          </div>
        </div>

        {/* Уведомление о добавлении товара в корзину */}
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

        <div className="product-specs" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', marginTop: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ color: '#000', marginBottom: '15px' }}>Характеристики</h2>
          {Object.entries(product.specs || {}).map(([key, value]) => (
            <div key={key} className="spec-item" style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
              <span className="spec-label" style={{ fontWeight: 'bold', color: '#000', flex: 1 }}>{key}:</span>
              <span className="spec-value" style={{ color: '#555', flex: 2 }}>{value}</span>
            </div>
          ))}
        </div>

        <div className="related-products" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', marginTop: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ color: '#000' }}>Похожие товары</h2>
          <div className="product-list">
            {/* Здесь можно добавить компоненты для отображения похожих товаров */}
          </div>
        </div>
      </div>

      {/* Модальное окно для отображения изображения в большем размере */}
      {isModalOpen && (
        <div 
          className="modal-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          onClick={handleCloseModal} // закрытие модального окна при клике на фон
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()} // предотвращаем закрытие при клике на изображение
          >
            <img
              src={selectedImage}
              alt={product.name}
              style={{
                maxWidth: '80%',
                maxHeight: '80vh',
                objectFit: 'contain',
              }}
            />
            <button
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: '#ff4d4d',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                padding: '10px',
                cursor: 'pointer',
                fontSize: '20px',
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
