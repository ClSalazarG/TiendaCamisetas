import React from 'react';
import type { Product, Size } from '../types';
import ProductCard from './ProductCard';

type Props = {
  items: Product[];
  onAdd?: (product: Product, size: Size) => void;
};

export default function ProductList({ items, onAdd }: Props) {
  return (
    <div>
      <h2>Productos</h2>
      <section className="products-grid">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} />
        ))}
      </section>
    </div>
  );
}
