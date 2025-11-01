import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import App from '../App';
import { CartProvider } from '../context/CartContext';

test('agregar producto y aumentar/disminuir cantidad en carrito', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={['/']}>
      <CartProvider>
        <App />
      </CartProvider>
    </MemoryRouter>
  );

  // Añadir primer producto disponible
  const addButtons = await screen.findAllByRole('button', { name: /Agregar al carrito/i });
  expect(addButtons.length).toBeGreaterThan(0);
  await user.click(addButtons[0]);

  // Header debe mostrar carrito con 1
  expect(await screen.findByText(/Carrito \(1\)/i)).toBeInTheDocument();

  // Ir al carrito
  const cartLink = screen.getByText(/Carrito \(1\)/i);
  await user.click(cartLink);

  // Aumentar cantidad (+)
  const incBtn = await screen.findByRole('button', { name: /Aumentar cantidad/i });
  await user.click(incBtn);
  // ahora la cantidad debe ser 2
  expect(await screen.findByText('2')).toBeInTheDocument();

  // Disminuir cantidad (−)
  const decBtn = screen.getByRole('button', { name: /Disminuir cantidad/i });
  await user.click(decBtn);
  // vuelve a 1
  expect(await screen.findByText('1')).toBeInTheDocument();

  // Disminuir otra vez elimina el ítem (lógica elimina cuando qty <= 0)
  await user.click(decBtn);
  expect(await screen.findByText(/Carrito vacío/i)).toBeInTheDocument();
});
