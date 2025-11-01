import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { items } = useCart();
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <header className="header">
      <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between', background:'transparent', boxShadow:'none', paddingLeft:0, paddingRight:0}}>
        <div><Link to="/" style={{color:'inherit',textDecoration:'none'}}><h1 style={{margin:0, color:'#FFEB3B'}}>Tienda Camisetas</h1></Link></div>
        <nav className="nav">
          <Link to="/">Tienda</Link>
          <Link to="/cart" style={{marginLeft:12}}>Carrito ({count})</Link>
          <Link to="/checkout" style={{marginLeft:12}}>Checkout</Link>
        </nav>
      </div>
    </header>
  );
}
