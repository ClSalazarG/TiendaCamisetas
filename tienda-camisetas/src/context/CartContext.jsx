import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function useCart() { return useContext(CartContext); }

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('cart_v1');
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('cart_v1', JSON.stringify(items));
  }, [items]);

  function addItem(product, qty = 1, size = null) {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === product.id && i.size === size);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx].qty += qty;
        return updated;
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty, size, image: product.image }];
    });
  }

  function removeItem(index) {
    setItems(prev => prev.filter((_, i) => i !== index));
  }

  function clear() { setItems([]); }

  function updateItemQty(index, delta) {
    setItems(prev => {
      const updated = [...prev];
      if (index < 0 || index >= updated.length) return prev;
      const newQty = (updated[index].qty || 0) + delta;
      if (newQty <= 0) {
        updated.splice(index, 1);
      } else {
        updated[index] = { ...updated[index], qty: newQty };
      }
      return updated;
    });
  }

  function total() {
    return items.reduce((s, it) => s + it.price * it.qty, 0);
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clear, updateItemQty, total }}>
      {children}
    </CartContext.Provider>
  );
}
