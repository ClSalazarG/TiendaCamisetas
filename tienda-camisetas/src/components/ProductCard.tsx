import React, { useState } from 'react';
import type { Product, Size } from '../types';
import { useCart } from '../context/CartContext';

type Props = {
  product: Product;
  onAdd?: (product: Product, size: Size) => void;
};

export default function ProductCard({ product, onAdd }: Props) {
  const { addItem } = useCart();
  const [size, setSize] = useState<Size>('M');
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
            className="input"
            value={size}
            onChange={e => setSize(e.target.value as Size)}
            style={{ maxWidth: 140 }}
          >
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </label>
        <button className="btn primary" onClick={() => onAdd?.(product, size)}>Agregar al carrito</button>
      </div>
    </article>
  );
}
