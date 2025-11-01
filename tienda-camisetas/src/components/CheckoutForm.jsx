import React from 'react';
import { useForm } from 'react-hook-form';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CheckoutForm() {
  const { items, clear, total } = useCart();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  function onSubmit(data) {
    console.log('Orden enviada', { customer: data, items, total: total() });
    clear();
    alert('Pedido enviado correctamente. Preparar evidencia para la presentación.');
    navigate('/');
  }

  if (!items.length) return <div><h2>Carrito vacío</h2></div>;

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card" style={{marginBottom:12}}>
          <label>Nombre completo</label><br />
          <input {...register('name', { required: 'Requerido', minLength: { value: 3, message: 'Mínimo 3 caracteres' } })} />
          {errors.name && <div className="small" style={{color:'red'}}>{errors.name.message}</div>}
        </div>

        <div className="card" style={{marginBottom:12}}>
          <label>Email</label><br />
          <input {...register('email', { required: 'Requerido', pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' } })} />
          {errors.email && <div className="small" style={{color:'red'}}>{errors.email.message}</div>}
        </div>

        <div className="card" style={{marginBottom:12}}>
          <label>Dirección</label><br />
          <input {...register('address', { required: 'Requerido' })} />
          {errors.address && <div className="small" style={{color:'red'}}>{errors.address.message}</div>}
        </div>

        <div>
          <strong>Total a pagar: ${total().toFixed(2)}</strong>
        </div>

        <div style={{marginTop:12}}>
          <button className="button btn-primary" disabled={isSubmitting}>Pagar y finalizar</button>
        </div>
      </form>
    </div>
  );
}
