import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // added

export default function CheckoutForm() {
  const { items, clear, total } = useCart();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { user } = useAuth(); // use auth context

  // Añadido: estilos mínimos para PC y mensajes
  const styles = {
    container: {
      maxWidth: 900,
      margin: '0 auto',
      padding: 24,
    },
    input: {
      width: '100%',
      boxSizing: 'border-box',
      padding: '8px 10px',
      fontSize: 16,
    },
    card: {
      marginBottom: 12,
    },
    center: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '40vh',
      padding: 20,
      textAlign: 'center'
    },
    retryBtn: {
      marginTop: 12,
      padding: '8px 14px',
      cursor: 'pointer'
    }
  };

  // Detectar si el usuario está en PC (ancho >= 1024)
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
  useEffect(() => {
    function onResize() {
      setIsDesktop(window.innerWidth >= 1024);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  function onSubmit(data) {
    console.log('Orden enviada', { customer: data, items, total: total() });
    clear();
    alert('Pedido enviado correctamente. Preparar evidencia para la presentación.');
    navigate('/');
  }

  if (!items.length) return <div><h2>Carrito vacío</h2></div>;

  if (!user) {
    return (
      <div style={styles.container}>
        <h2>Checkout</h2>
        <div style={{marginBottom:12}}>
          <p>Debes iniciar sesión o registrarte antes de finalizar la compra.</p>
          <p>
            <Link to="/login">Iniciar sesión</Link> · <Link to="/register">Registrarse</Link>
          </p>
        </div>
      </div>
    );
  }

  // Si no es desktop, bloquear y mostrar mensaje
  if (!isDesktop) {
    return (
      <div style={styles.center}>
        <h2>Solo disponible en PC</h2>
        <p>Por el momento el proceso de checkout está disponible únicamente desde un equipo de escritorio.</p>
        <p>Por favor abre la página en un PC (ancho recomendado ≥ 1024px).</p>
        <button style={styles.retryBtn} onClick={() => setIsDesktop(window.innerWidth >= 1024)}>Reintentar</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card" style={styles.card}>
          <label>Nombre completo</label><br />
          <input style={styles.input} {...register('name', { required: 'Requerido', minLength: { value: 3, message: 'Mínimo 3 caracteres' } })} />
          {errors.name && <div className="small" style={{color:'red'}}>{errors.name.message}</div>}
        </div>

        <div className="card" style={styles.card}>
          <label>Email</label><br />
          <input style={styles.input} {...register('email', { required: 'Requerido', pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' } })} />
          {errors.email && <div className="small" style={{color:'red'}}>{errors.email.message}</div>}
        </div>

        <div className="card" style={styles.card}>
          <label>Dirección</label><br />
          <input style={styles.input} {...register('address', { required: 'Requerido' })} />
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
