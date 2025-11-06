import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartContextValue, CartItem, CartState, Product, Size } from "../types";

const CartContext = createContext<CartContextValue | null>(null);

function loadInitial(): CartState {
  try {
    const raw = localStorage.getItem("cart");
    const parsed = raw ? (JSON.parse(raw) as Partial<CartState>) : null;
    const items = Array.isArray(parsed?.items) ? parsed!.items : [];
    return {
      items: items.map((it: any): CartItem => ({
        product: it.product,
        quantity: typeof it.quantity === "number" ? it.quantity : 1,
        size: (it.size as Size) || "M",
      })),
    };
  } catch {
    return { items: [] };
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CartState>(loadInitial);

  const addItem: CartContextValue["addItem"] = (product: Product, qty = 1, size: Size = "M") => {
    setState((prev) => {
      const items = [...prev.items];
      const idx = items.findIndex((it) => it.product.id === product.id && it.size === size);
      if (idx >= 0) items[idx] = { ...items[idx], quantity: items[idx].quantity + qty };
      else items.push({ product, quantity: qty, size });
      return { items };
    });
  };

  const removeItem: CartContextValue["removeItem"] = (productId) =>
    setState((prev) => ({ items: prev.items.filter((it) => it.product.id !== productId) }));

  const removeLine: CartContextValue["removeLine"] = (productId, size = "M") =>
    setState((prev) => ({
      items: prev.items.filter((it) => !(it.product.id === productId && it.size === size)),
    }));

  const increment: CartContextValue["increment"] = (productId, size = "M") =>
    setState((prev) => ({
      items: prev.items.map((it) =>
        it.product.id === productId && it.size === size ? { ...it, quantity: it.quantity + 1 } : it
      ),
    }));

  const decrement: CartContextValue["decrement"] = (productId, size = "M") =>
    setState((prev) => {
      const items = prev.items
        .map((it) =>
          it.product.id === productId && it.size === size ? { ...it, quantity: it.quantity - 1 } : it
        )
        .filter((it) => it.quantity > 0);
      return { items };
    });

  const clear: CartContextValue["clear"] = () => setState({ items: [] });

  const total = useMemo(
    () => state.items.reduce((acc, it) => acc + it.product.price * it.quantity, 0),
    [state.items]
  );

  useEffect(() => {
    try { localStorage.setItem("cart", JSON.stringify(state)); } catch {}
  }, [state]);

  const value: CartContextValue = useMemo(
    () => ({ state, addItem, removeItem, removeLine, increment, decrement, clear, total }),
    [state, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
};
