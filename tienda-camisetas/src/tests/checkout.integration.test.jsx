import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import App from '../App';
import { CartProvider } from '../context/CartContext';

test('flujo checkout limpia carrito y llama alert', async () => {
  const user = userEvent.setup();
  const alertMock = vi.fn();
  const originalAlert = window.alert;
  window.alert = alertMock;

  render(
    <MemoryRouter initialEntries={['/']}>
      <CartProvider>
        <App />
      </CartProvider>
    </MemoryRouter>
  );

  // Agregar producto
  const addButtons = await screen.findAllByRole('button', { name: /Agregar al carrito/i });
  await user.click(addButtons[0]);

  // Ir a checkout vía header
  const checkoutLink = await screen.findByText(/Checkout/i);
  await user.click(checkoutLink);

  // Completar formulario
  const nameInput = screen.getByLabelText(/Nombre completo/i);
  const emailInput = screen.getByLabelText(/Email/i);
  const addressInput = screen.getByLabelText(/Dirección/i);

  await user.type(nameInput, 'Test Usuario');
  await user.type(emailInput, 'test@example.com');
  await user.type(addressInput, 'Calle Falsa 123');

  // Enviar
  const submitBtn = screen.getByRole('button', { name: /Pagar y finalizar/i });
  await user.click(submitBtn);

  // alert fue llamado y carrito queda vacío (header muestra Carrito (0) o mensaje vacío)
  expect(alertMock).toHaveBeenCalled();
  expect(await screen.findByText(/Carrito \(0\)|Carrito vacío/i)).toBeInTheDocument();

  // restaurar alert
  window.alert = originalAlert;
});
