import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

function loadInitial() {
  try {
    const raw = localStorage.getItem("cart");
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && Array.isArray(parsed.items)) {
      // Normalizar posibles items antiguos sin size/quantity
      const items = parsed.items.map((it) => ({
        size: "M",
        quantity: 1,
        ...it,
        quantity: typeof it.quantity === "number" ? it.quantity : 1,
        size: it.size || "M",
      }));
      return { items };
    }
  } catch {}
  return { items: [] };
}

export function CartProvider({ children }) {
  const [state, setState] = useState(loadInitial);

  const addItem = (product, qty = 1, size = "M") => {
    setState((prev) => {
      const items = [...prev.items];
      const idx = items.findIndex((it) => it.product.id === product.id && (it.size ?? "M") === size);
      if (idx >= 0) {
        items[idx] = { ...items[idx], quantity: (items[idx].quantity || 0) + qty };
      } else {
        items.push({ product, quantity: qty, size });
      }
      return { items };
    });
  };

  // Elimina todas las tallas de un producto por id
  const removeItem = (productId) => {
    setState((prev) => ({ items: prev.items.filter((it) => it.product.id !== productId) }));
  };

  // Elimina solo la línea id+talla
  const removeLine = (productId, size = "M") => {
    setState((prev) => ({
      items: prev.items.filter((it) => !(it.product.id === productId && (it.size ?? "M") === size)),
    }));
  };

  const increment = (productId, size = "M") => {
    setState((prev) => ({
      items: prev.items.map((it) =>
        it.product.id === productId && (it.size ?? "M") === size
          ? { ...it, quantity: (it.quantity || 0) + 1 }
          : it
      ),
    }));
  };

  const decrement = (productId, size = "M") => {
    setState((prev) => {
      const items = prev.items
        .map((it) =>
          it.product.id === productId && (it.size ?? "M") === size
            ? { ...it, quantity: Math.max(0, (it.quantity || 0) - 1) }
            : it
        )
        .filter((it) => (it.quantity || 0) > 0);
      return { items };
    });
  };

  const clear = () => setState({ items: [] });

  const total = useMemo(
    () => state.items.reduce((acc, it) => acc + (it.product.price || 0) * (it.quantity || 0), 0),
    [state.items]
  );

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(state));
    } catch {}
  }, [state]);

  const value = useMemo(
    () => ({ state, addItem, removeItem, removeLine, increment, decrement, clear, total }),
    [state, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
