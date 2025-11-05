import React, { useEffect } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import ProductList from "./components/ProductList";
import { products } from "./data/products";
import { useCart } from "./context/CartContext";
import "./App.css";

// Contenido mínimo para las páginas principales
const HomePage = () => {
  const { addItem } = useCart();
  return (
    <div className="page-box">
      <h1>Inicio</h1>
      <p>Bienvenido a la tienda.</p>
      {/* onAdd(product, size) -> addItem(product, 1, size) */}
      <ProductList items={products} onAdd={(p, size) => addItem(p, 1, size)} />
    </div>
  );
};

const CartPage = () => {
  const { state, increment, decrement, removeLine, total } = useCart();
  const fmtCLP = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
  const count = state.items.reduce((acc, it) => acc + (it.quantity || 0), 0);

  return (
    <div className="page-box">
      <h1>Carrito</h1>
      <p>Ítems en el carrito: {count}</p>
      <ul className="cart-lines">
        {state.items.map((it) => {
          const key = `${it.product.id}-${it.size ?? "M"}`;
          const lineSubtotal = (it.product.price || 0) * (it.quantity || 0);
          return (
            <li key={key} className="cart-line">
              <p className="line-name">{it.product.name} — Talla {it.size ?? "M"}</p>
              <div className="qty">
                <button className="qty-btn" onClick={() => decrement(it.product.id, it.size)}>-</button>
                <span className="qty-value">{it.quantity}</span>
                <button className="qty-btn" onClick={() => increment(it.product.id, it.size)}>+</button>
              </div>
              <div style={{ display: "grid", gap: 6, justifyItems: "end" }}>
                <span className="line-price">{fmtCLP.format(lineSubtotal)}</span>
                <button className="remove-btn" onClick={() => removeLine(it.product.id, it.size)}>Quitar</button>
              </div>
            </li>
          );
        })}
      </ul>
      <p style={{ textAlign: "right", fontWeight: 800 }}>Total: {fmtCLP.format(total)}</p>
    </div>
  );
};

export default function App() {
  useEffect(() => {
    document.title = "CamisetasStore";
  }, []);

  const { isAuthenticated, logout } = useAuth();
  const { state } = useCart();
  const cartCount = state.items.reduce((acc, it) => acc + (it.quantity || 0), 0);

  return (
    <>
      <header className="header">
        <div className="container navbar">
          <div className="brand">
            <span className="brand-badge">CS</span>
            <span>CamisetasStore</span>
          </div>
          <nav className="nav-links">
            {/* Cada enlace con su propio cuadro (pill) */}
            <Link to="/" className="nav-pill">Inicio</Link>
            <Link to="/cart" className="nav-pill">
              Carrito
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
            <Link to="/checkout" className="nav-pill">Checkout</Link>

            {/* Autenticación */}
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="btn">Login</Link>
                <Link to="/register" className="btn">Registro</Link>
              </>
            ) : (
              <button className="btn" onClick={logout}>Cerrar sesión</button>
            )}
          </nav>
        </div>
      </header>

      <main className="container page">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">© {new Date().getFullYear()} Tienda Camisetas</div>
      </footer>
    </>
  );
}
