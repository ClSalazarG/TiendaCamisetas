import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);
const USERS_KEY = "users";
const SESSION_KEY = "sessionUser";

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}
function writeUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {}
}
function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function writeSession(user) {
  try {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  } catch {}
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readSession());

  const login = async (email, password) => {
    const users = readUsers();
    const found = users.find(
      (u) => u.email?.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) throw new Error("Credenciales inválidas");
    const { password: _omit, ...safe } = found;
    setUser(safe);
    writeSession(safe);
  };

  const register = async (name, email, password) => {
    const users = readUsers();
    if (users.some((u) => u.email?.toLowerCase() === email.toLowerCase())) {
      throw new Error("El email ya está registrado");
    }
    const id = (globalThis.crypto?.randomUUID?.() ?? String(Date.now()));
    const newUser = { id, name, email, password };
    users.push(newUser);
    writeUsers(users);
    const { password: _omit, ...safe } = newUser;
    setUser(safe);
    writeSession(safe);
  };

  const logout = () => {
    setUser(null);
    writeSession(null);
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === SESSION_KEY) setUser(readSession());
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, login, register, logout }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
