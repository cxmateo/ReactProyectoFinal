import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';

const CartWidget = () => {
  const { getTotalQuantity } = useContext(CartContext);
  const totalQuantity = getTotalQuantity();

  return (
    <Link to="/cart" className="cart-widget">
      <img src="/carrito.png" alt="Carrito de compras" width="28" />
      
      {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
    </Link>
  );
};

export default CartWidget;
