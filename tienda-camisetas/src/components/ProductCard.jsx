import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.size?.[0] || null);

  return (
    <div className="card">
      <img src={product.image} alt={product.name} style={{width:'100%',borderRadius:6}} />
      <h3>{product.name}</h3>
      <p className="small">Precio: ${product.price.toFixed(2)}</p>
      {product.size && (
        <div style={{marginBottom:8}}>
          <label className="small">Talla: </label>
          <select value={size} onChange={e => setSize(e.target.value)}>
            {product.size.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      )}
      <div style={{marginTop:8}}>
        <button className="button btn-primary" onClick={() => addItem(product,1,size)}>Agregar al carrito</button>
      </div>
    </div>
  );
}
