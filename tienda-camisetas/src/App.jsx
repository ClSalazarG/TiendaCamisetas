import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';

export default function App() {
  return (
    <>
      <Header />
      <div className="container" style={{ paddingTop: 16 }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="*" element={<div><h2>Página no encontrada</h2></div>} />
        </Routes>
      </div>
    </>
  );
}
