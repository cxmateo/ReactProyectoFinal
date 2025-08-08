import React, { useState, createContext, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const cartEnLocalStorage = localStorage.getItem('cart');
      return cartEnLocalStorage ? JSON.parse(cartEnLocalStorage) : [];
    } catch (error) {
      console.error("Error al parsear el carrito de localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (item, quantity) => {
    const existingItem = cart.find((prod) => prod.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((prod) =>
          prod.id === item.id
            ? { ...prod, quantity: prod.quantity + quantity }
            : prod
        )
      );
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const removeLineItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const decreaseItem = (id) => {
    setCart(cart.map(prod => {
        if (prod.id === id) {
            return prod.quantity > 1 ? { ...prod, quantity: prod.quantity - 1 } : null;
        }
        return prod;
    }).filter(prod => prod !== null));
  };

  const getTotalQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        clearCart,
        removeLineItem,
        decreaseItem,
        getTotalQuantity,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
