import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductoPorId } from '../services/firebase/firestore';
import ItemCount from './ItemCount';
import { CartContext } from './CartContext';

const ItemDetailContainer = () => {
  const { productoId } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantityAdded, setQuantityAdded] = useState(0);
  const { cart, addItem } = useContext(CartContext);

  useEffect(() => {
    setLoading(true);
    getProductoPorId(productoId)
      .then((res) => {
        setProducto(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productoId]);

  const handleOnAdd = (quantity) => {
    if (producto) {
      addItem(producto, quantity);
      setQuantityAdded(quantity); 
    }
  };

  if (loading) return <p className="message">Cargando detalle...</p>;
  if (!producto) return <p className="message">Producto no encontrado.</p>;

  const itemEnCarrito = cart.find(item => item.id === producto.id);
  const stockDisponible = itemEnCarrito ? producto.stock - itemEnCarrito.quantity : producto.stock;

  return (
    <div className="detail-container">
      <div className="card">
        <img className="product-image" src={producto.imagen} alt={producto.nombre} />
        <div className="info">
          <h2 className="product-name">{producto.nombre}</h2>
          <p className="product-category">{producto.categoria}</p>
          
          {producto.soldCount > 0 && (
            <p className="product-sold-count">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>
              {producto.soldCount} vendidos
            </p>
          )}

          <p className="product-description">{producto.descripcion}</p>
          <p className="product-price">${producto.precio.toLocaleString('es-AR')}</p>
          
          <p className={producto.stock > 0 ? "product-stock" : "product-stock no-stock"}>
            {producto.stock > 0 ? `Stock disponible: ${producto.stock} unidades` : '¡Sin stock!'}
          </p>
          
          <div className="actions-container">
            <div className="primary-actions">
              <ItemCount stock={stockDisponible} onAdd={handleOnAdd} />
              
              {quantityAdded > 0 && (
                <Link to="/cart" className="btn-primary btn-checkout">
                  Terminar Compra
                </Link>
              )}
            </div>
            
            <Link to="/" className="back-button">Volver a la tienda</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailContainer;
