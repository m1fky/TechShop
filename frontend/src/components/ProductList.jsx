import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { apiRequest } from '../api';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]); // Для сохранения оригинального списка
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('none'); // 'none', 'asc', 'desc'

  const updateProductQuantity = (productId, newQuantity) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? { ...product, stockQuantity: newQuantity }
          : product
      )
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiRequest('/products');
        setProducts(data);
        setOriginalProducts(data); // Сохраняем оригинальный список
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSortChange = (e) => {
    const selectedSortOrder = e.target.value;
    setSortOrder(selectedSortOrder);

    if (selectedSortOrder === 'none') {
      // Если выбрано "Без сортировки", восстанавливаем оригинальный порядок
      setProducts([...originalProducts]);
      return;
    }

    setProducts((prevProducts) => {
      const sortedProducts = [...prevProducts];
      sortedProducts.sort((a, b) =>
        selectedSortOrder === 'asc' ? a.price - b.price : b.price - a.price
      );
      return sortedProducts;
    });
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{
        backgroundColor: '#f9f9f9',
        padding: '40px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>Список товаров</h2>
          <div>
            <label htmlFor="sortOrder" style={{ marginRight: '10px', fontWeight: 'bold' }}>
              Сортировка по цене:
            </label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={handleSortChange}
              style={{
                padding: '5px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            >
              <option value="none">Без сортировки</option>
              <option value="asc">По возрастанию</option>
              <option value="desc">По убыванию</option>
            </select>
          </div>
        </div>
        <div className="product-list" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              {...product}
              updateQuantity={updateProductQuantity}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;