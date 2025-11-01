import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { items, removeItem, clear, total, updateItemQty } = useCart();

  if (!items.length) {
    return <div><h2>Carrito vacío</h2><Link to="/">Ir a la tienda</Link></div>;
  }

  return (
    // contenedor oscuro según paleta (#1E2A38) con texto claro
    <div style={{ background: '#1E2A38', color: '#FFFFFF', padding: 16, borderRadius: 8 }}>
      <h2 style={{ marginTop: 0 }}>Carrito</h2>
      <div>
        {items.map((it, idx) => (
          <div key={idx} className="card" style={{display:'flex',gap:12,alignItems:'center',marginBottom:8}}>
            <img src={it.image} alt={it.name} title={it.name} style={{width:80,height:80,objectFit:'cover'}} />
            <div style={{flex:1}}>
              <strong style={{color:'#000'}}>{it.name}</strong>
              <div className="small">Talla: {it.size || '-'}</div>

              <div className="small" style={{display:'flex', alignItems:'center', gap:8}}>
                <span>Cantidad:</span>
                <div>
                  <button
                    className="button"
                    aria-label={`Disminuir cantidad de ${it.name}`}
                    onClick={() => updateItemQty(idx, -1)}
                    style={{padding:'4px 8px', marginRight:6, background: '#FFD700', color: '#000', borderRadius:4}}
                  >
                    −
                  </button>
                  <span style={{minWidth:24, display:'inline-block', textAlign:'center'}}>{it.qty}</span>
                  <button
                    className="button"
                    aria-label={`Aumentar cantidad de ${it.name}`}
                    onClick={() => updateItemQty(idx, 1)}
                    style={{padding:'4px 8px', marginLeft:6, background: '#FFD700', color: '#000', borderRadius:4}}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="small">Subtotal: ${(it.price * it.qty).toFixed(2)}</div>
            </div>
            <div>
              <button
                className="button"
                aria-label={`Eliminar ${it.name}`}
                onClick={() => removeItem(idx)}
                style={{ background: '#E53935', color: '#fff' }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:12}}>
        <strong style={{color:'#FFEB3B'}}>Total: ${total().toFixed(2)}</strong>
      </div>
      <div style={{marginTop:12}}>
        <Link to="/checkout">
          <button
            className="button"
            style={{marginRight:8, background: '#FFD700', color:'#000'}}
            aria-label="Ir a checkout"
          >
            Ir a checkout
          </button>
        </Link>
        <button
          className="button"
          onClick={() => {
            if (window.confirm('¿Seguro que quieres vaciar todo el carrito? Esta acción no se puede deshacer.')) {
              clear();
            }
          }}
          style={{background:'#F57C00', color:'#000'}}
          aria-label="Vaciar carrito"
        >
          Vaciar
        </button>
      </div>
    </div>
  );
}
