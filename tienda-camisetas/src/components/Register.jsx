import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register: reg, handleSubmit, watch, setError, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const { register: authRegister } = useAuth();
  const password = watch('password', '');

  function onSubmit(data) {
    const res = authRegister({ name: data.name, phone: data.phone, email: data.email, password: data.password });
    if (!res.ok) {
      // mostrar error en email si ya existe
      setError('email', { type: 'manual', message: res.message });
      return;
    }
    alert('Registro exitoso. Sesión iniciada.');
    navigate('/');
  }

  return (
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="card" style={{marginBottom:12}}>
          <label>Nombre completo</label><br />
          <input {...register('name', {
            required: 'Requerido',
            minLength: { value: 3, message: 'Mínimo 3 caracteres' }
          })} />
          {errors.name && <div className="small" style={{color:'red'}}>{errors.name.message}</div>}
        </div>

        <div className="card" style={{marginBottom:12}}>
          <label>Número de celular</label><br />
          <input {...register('phone', {
            required: 'Requerido',
            pattern: { value: /^[0-9]{9}$/, message: 'Debe ser un número de 9 dígitos' }
          })} />
          {errors.phone && <div className="small" style={{color:'red'}}>{errors.phone.message}</div>}
        </div>

        <div className="card" style={{marginBottom:12}}>
          <label>Email</label><br />
          <input {...register('email', {
            required: 'Requerido',
            pattern: { value: /^[^\s@]+@[^\s@]+\.(com|cl)$/i, message: 'Email inválido (debe contener @ y terminar en .com o .cl)' }
          })} />
          {errors.email && <div className="small" style={{color:'red'}}>{errors.email.message}</div>}
        </div>

        <div className="card" style={{marginBottom:12}}>
          <label>Contraseña</label><br />
          <input type="password" {...register('password', {
            required: 'Requerido',
            minLength: { value: 8, message: 'Mínimo 8 caracteres' },
            validate: value => {
              if (!/[A-Z]/.test(value)) return 'Debe contener al menos una letra mayúscula';
              if (!/[a-z]/.test(value)) return 'Debe contener al menos una letra minúscula';
              if (!/[0-9]/.test(value)) return 'Debe contener al menos un número';
              return true;
            }
          })} />
          {errors.password && <div className="small" style={{color:'red'}}>{errors.password.message}</div>}
        </div>

        <div className="card" style={{marginBottom:12}}>
          <label>Confirmar contraseña</label><br />
          <input type="password" {...register('confirm', {
            required: 'Requerido',
            validate: value => value === password || 'Las contraseñas no coinciden'
          })} />
          {errors.confirm && <div className="small" style={{color:'red'}}>{errors.confirm.message}</div>}
        </div>

        <div style={{marginTop:12}}>
          <button className="button btn-primary" disabled={isSubmitting}>Crear cuenta</button>
        </div>

        <div style={{marginTop:12}}>
          <small>¿Ya tienes cuenta? <Link to="/login">Entrar</Link></small>
        </div>
      </form>
    </div>
  );
}
