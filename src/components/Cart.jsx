import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';

const Cart = () => {
  const { cart, clearCart, getTotalPrice, removeLineItem, addItem, decreaseItem } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Tu carrito está vacío</h2>
        <p>Agrega productos para continuar.</p>
        <Link to="/" className="btn-primary">
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Tu Carrito</h1>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.imagen} alt={item.nombre} className="cart-item-image" />
            <div className="cart-item-details">
              <h2>{item.nombre}</h2>
              <p>Precio unitario: ${item.precio.toLocaleString('es-AR')}</p>
              <p>Subtotal: ${(item.precio * item.quantity).toLocaleString('es-AR')}</p>
              
              <div className="cart-item-quantity">
                <button onClick={() => decreaseItem(item.id)} className="btn-quantity">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => addItem(item, 1)} className="btn-quantity" disabled={item.quantity >= item.stock}>+</button>
              </div>
            </div>
            <button onClick={() => removeLineItem(item.id)} className="btn-remove-item">
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ${getTotalPrice().toLocaleString('es-AR')}</h3>
        <div className="cart-actions">
          <button onClick={clearCart} className="btn-secondary">
            Vaciar Carrito
          </button>
          <Link to="/checkout" className="btn-primary">
            Finalizar Compra
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
