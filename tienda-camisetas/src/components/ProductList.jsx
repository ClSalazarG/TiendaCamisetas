import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

export default function ProductList() {
  return (
    <div>
      <h2>Productos</h2>
      <div className="grid">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
