import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

export default function ProductList({ items, onAdd }) {
  return (
    <div>
      <h2>Productos</h2>
      <section className="products-grid">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd /* (product, size) */} />
        ))}
      </section>
    </div>
  );
}
