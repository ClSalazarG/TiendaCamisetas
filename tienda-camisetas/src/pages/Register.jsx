import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register: doRegister } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const pwd = watch("password");

  const onSubmit = async ({ name, email, password, confirm }) => {
    setServerError(null);
    if (password !== confirm) {
      setServerError("Las contraseñas no coinciden");
      return;
    }
    try {
      await doRegister(name, email, password);
      navigate("/", { replace: true });
    } catch (e) {
      setServerError(e?.message || "No se pudo registrar");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "grid", gap: 8, maxWidth: 360 }}>
      <h2>Registro</h2>
      {serverError && <p style={{ color: "red" }}>{serverError}</p>}
      <input placeholder="Nombre" {...register("name", { required: "Nombre requerido" })} />
      {errors.name && <span style={{ color: "red" }}>{errors.name.message}</span>}

      <input placeholder="Email" type="email" {...register("email", { required: "Email requerido" })} />
      {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}

      <input placeholder="Contraseña" type="password" {...register("password", { required: "Contraseña requerida", minLength: { value: 6, message: "Mínimo 6 caracteres" } })} />
      {errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}

      <input placeholder="Confirmar contraseña" type="password" {...register("confirm", { required: "Confirma tu contraseña" })} />
      {errors.confirm && <span style={{ color: "red" }}>{errors.confirm.message}</span>}

      <button type="submit" disabled={isSubmitting}>Crear cuenta</button>
      <small>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></small>
    </form>
  );
}
