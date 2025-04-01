// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductPage from './components/ProductPage';
import CartDropdown from './components/cart/CartDropdown';
import TechShop from './components/TechShop';
import CheckoutPage from './components/CheckoutPage';
import ShippingAndPaymentPage from './components/ShippingAndPaymentPage';
import GuaranteePage from './components/GuaranteePage';
import SupportPage from './components/SupportPage';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<TechShop />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartDropdown />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<ShippingAndPaymentPage />} />
          <Route path="/warranty" element={<GuaranteePage />} />
          <Route path="/support" element={<SupportPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;