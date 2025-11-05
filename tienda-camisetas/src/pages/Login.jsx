import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css"; // Import the CSS file for styling

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async ({ email, password }) => {
    setServerError(null);
    try {
      await login(email, password);
      const redirectTo = location?.state?.redirectTo || "/";
      navigate(redirectTo, { replace: true });
    } catch (e) {
      setServerError(e?.message || "No se pudo iniciar sesión");
    }
  };

  return (
    <div className="auth-wrapper">
      <section className="auth-card">
        <h2>Iniciar sesión</h2>
        {serverError && <p className="error">{serverError}</p>}
        <form className="form" onSubmit={handleSubmit(onSubmit)} style={{ display: "grid", gap: 8, maxWidth: 360 }}>
          <div>
            <input className="input" placeholder="Email" type="email" {...register("email", { required: "Email requerido" })} />
            {errors.email && <span className="error" style={{ color: "red" }}>{errors.email.message}</span>}
          </div>
          <div>
            <input className="input" placeholder="Contraseña" type="password" {...register("password", { required: "Contraseña requerida" })} />
            {errors.password && <span className="error" style={{ color: "red" }}>{errors.password.message}</span>}
          </div>
          <div className="actions">
            <button className="btn primary" type="submit" disabled={isSubmitting}>Entrar</button>
            <Link className="link-muted" to="/register">Crear cuenta</Link>
          </div>
        </form>
      </section>
    </div>
  );
}
