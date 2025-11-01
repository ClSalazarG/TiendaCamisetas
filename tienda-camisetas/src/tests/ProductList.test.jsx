import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import ProductList from '../components/ProductList';

test('muestra productos de ejemplo', () => {
  render(
    <BrowserRouter>
      <CartProvider>
        <ProductList />
      </CartProvider>
    </BrowserRouter>
  );
  const title = screen.getByText(/Productos/i);
  expect(title).toBeInTheDocument();
});
