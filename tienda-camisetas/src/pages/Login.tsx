import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css"; // Import the CSS file for styling

type LoginValues = { email: string; password: string };

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { redirectTo?: string } };
  const [serverError, setServerError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>();

  const onSubmit: SubmitHandler<LoginValues> = async ({ email, password }) => {
    setServerError(null);
    try {
      await login(email, password);
      navigate(location.state?.redirectTo || "/", { replace: true });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "No se pudo iniciar sesión";
      setServerError(msg);
    }
  };

  return (
    <div className="auth-wrapper">
      <section className="auth-card">
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "grid", gap: 8, maxWidth: 360 }}>
          <h2>Iniciar sesión</h2>
          {serverError && <p style={{ color: "red" }}>{serverError}</p>}
          <input className="input" placeholder="Email" type="email" {...register("email", { required: "Email requerido" })} />
          {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}
          <input className="input" placeholder="Contraseña" type="password" {...register("password", { required: "Contraseña requerida" })} />
          {errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}
          <button className="btn primary" type="submit" disabled={isSubmitting}>Entrar</button>
          <small>¿No tienes cuenta? <Link className="link-muted" to="/register">Regístrate</Link></small>
        </form>
      </section>
    </div>
  );
}
