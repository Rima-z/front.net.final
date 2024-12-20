import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (article) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === article.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === article.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...article, quantity: 1 }];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart , setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};