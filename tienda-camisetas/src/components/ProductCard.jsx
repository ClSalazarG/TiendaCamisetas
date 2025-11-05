import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.size?.[0] || null);
  const fmtCLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

  return (
    <article className="product-card">
      <img className="product-img" src={product.image} alt={product.name} loading="lazy" style={{width:'100%',borderRadius:6}} />
      <div className="product-body">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">Precio: {fmtCLP.format(product.price)}</p>
        <label style={{ display: "grid", gap: 4 }}>
          <span style={{ fontSize: ".9rem", opacity: 0.9 }}>Talla</span>
          <select
            value={size}
            onChange={e => setSize(e.target.value)}
            className="input"
            style={{ maxWidth: 140 }}
          >
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </label>
        <button className="btn primary" onClick={() => addItem(product,1,size)}>Agregar al carrito</button>
      </div>
    </article>
  );
}
