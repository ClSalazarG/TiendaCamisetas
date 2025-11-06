import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type User = { id: string; name: string; email: string };
type StoredUser = User & { password: string };
type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const USERS_KEY = "users";
const SESSION_KEY = "sessionUser";
const AuthContext = createContext<AuthContextValue | null>(null);

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const arr = raw ? (JSON.parse(raw) as StoredUser[]) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}
function writeUsers(users: StoredUser[]) { try { localStorage.setItem(USERS_KEY, JSON.stringify(users)); } catch {} }
function readSession(): User | null { try { const raw = localStorage.getItem(SESSION_KEY); return raw ? JSON.parse(raw) : null; } catch { return null; } }
function writeSession(user: User | null) { try { user ? localStorage.setItem(SESSION_KEY, JSON.stringify(user)) : localStorage.removeItem(SESSION_KEY); } catch {} }

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => readSession());

  const login = async (email: string, password: string) => {
    const found = readUsers().find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) throw new Error("Credenciales inválidas");
    const { password: _omit, ...safe } = found;
    setUser(safe); writeSession(safe);
  };

  const register = async (name: string, email: string, password: string) => {
    const users = readUsers();
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) throw new Error("El email ya está registrado");
    const id = (globalThis.crypto?.randomUUID?.() ?? String(Date.now()));
    const nu: StoredUser = { id, name, email, password };
    users.push(nu); writeUsers(users);
    const { password: _omit, ...safe } = nu;
    setUser(safe); writeSession(safe);
  };

  const logout = () => { setUser(null); writeSession(null); };

  useEffect(() => {
    const h = (e: StorageEvent) => { if (e.key === SESSION_KEY) setUser(readSession()); };
    window.addEventListener("storage", h);
    return () => window.removeEventListener("storage", h);
  }, []);

  const value = useMemo<AuthContextValue>(() => ({ user, isAuthenticated: !!user, login, register, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};
