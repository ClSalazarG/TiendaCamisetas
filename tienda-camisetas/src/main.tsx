// Renombrar a TypeScript (sugerido):
// - src/App.jsx                      -> src/App.tsx
// - src/components/ProductCard.jsx   -> src/components/ProductCard.tsx
// - src/components/ProductList.jsx   -> src/components/ProductList.tsx
// - src/components/ProtectedRoute.jsx-> src/components/ProtectedRoute.tsx
// - src/context/AuthContext.jsx      -> src/context/AuthContext.tsx
// - src/context/CartContext.jsx      -> src/context/CartContext.tsx
// - src/pages/Login.jsx              -> src/pages/Login.tsx
// - src/pages/Register.jsx           -> src/pages/Register.tsx
// - src/pages/Checkout.jsx           -> src/pages/Checkout.tsx
// - src/data/products.js             -> src/data/products.ts
// Notas:
// - Prefiere imports sin extensión: import X from './ruta/modulo'
// - Si usas extensión en imports, actualiza .jsx/.js -> .tsx/.ts
// - Instala tipos: npm i -D typescript @types/react @types/react-dom
// - Verifica: npx tsc --noEmit
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);