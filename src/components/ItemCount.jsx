import { useState } from 'react';
//import '../ItemCount.css'; 
const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [cantidad, setCantidad] = useState(initial);

  const incrementar = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  return (
    <div className="item-count-container">
      <button 
        className="btn-add-cart" 
        onClick={() => onAdd(cantidad)}
        disabled={stock === 0}
      >
        Agregar al carrito
      </button>

      <div className="count-controls">
        <button className="btn-count" onClick={decrementar}>-</button>
        <span className="count-display">{cantidad}</span>
        <button className="btn-count" onClick={incrementar}>+</button>
      </div>
    </div>
  );
};

export default ItemCount;
