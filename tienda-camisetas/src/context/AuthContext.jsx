import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  function login({ email, password }) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) return { ok: false, message: 'Usuario o contraseña incorrectos.' };
    const session = { email: found.email, name: found.name, phone: found.phone };
    setUser(session);
    return { ok: true, user: session };
  }

  function logout() {
    setUser(null);
  }

  function register({ name, phone, email, password }) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, message: 'Ya existe un usuario con ese correo.' };
    }
    const newUser = { name: name.trim(), phone, email: email.toLowerCase(), password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    const session = { email: newUser.email, name: newUser.name, phone: newUser.phone };
    setUser(session);
    return { ok: true, user: session };
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
