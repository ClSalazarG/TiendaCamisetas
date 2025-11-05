import React from "react";
// import { useCart } from "../context/CartContext"; // si lo tienes

export default function Checkout() {
  // const { state, total } = useCart();
  return (
    <section>
      <h1>Checkout</h1>
      <p>Completa tu compra.</p>
      {/* Lista items si tienes el contexto del carrito */}
      {/* <ul>{state.items.map(it => <li key={it.product.id}>{it.product.name} x {it.quantity}</li>)}</ul>
      <p>Total: {total.toFixed(2)}</p> */}
    </section>
  );
}
