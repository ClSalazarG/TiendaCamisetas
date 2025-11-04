import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  function onSubmit(data) {
    const res = login({ email: data.email, password: data.password });
    if (res.ok) {
      alert('Sesión iniciada correctamente.');
      navigate('/');
    } else {
      // mostrar error en el campo email para feedback en rojo
      alert(res.message);
    }
  }

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card" style={{marginBottom:12}}>
          <label>Email</label><br />
          <input {...register('email', { required: 'Requerido', pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' } })} />
          {errors.email && <div className="small" style={{color:'red'}}>{errors.email.message}</div>}
        </div>

        <div className="card" style={{marginBottom:12}}>
          <label>Contraseña</label><br />
          <input type="password" {...register('password', { required: 'Requerido', minLength: { value: 8, message: 'Mínimo 8 caracteres' } })} />
          {errors.password && <div className="small" style={{color:'red'}}>{errors.password.message}</div>}
        </div>

        <div style={{marginTop:12}}>
          <button className="button btn-primary" disabled={isSubmitting}>Entrar</button>
        </div>

        <div style={{marginTop:12}}>
          <small>¿No tienes cuenta? <Link to="/register">Regístrate</Link></small>
        </div>
      </form>
    </div>
  );
}
