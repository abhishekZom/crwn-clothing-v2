import { createContext, useEffect, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  debugger;
  const existingCartItem = cartItems.find((cartItem) => 
    (cartItem.id === productToAdd.id)
  );

  if(existingCartItem) {
    return cartItems.map((cartItem) => (
      (cartItem.id === productToAdd.id)
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    ))
  }

  return [...cartItems, {...productToAdd, quantity: 1}];
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0
});

export const CartProvider = ({children}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((acc, cur) => (acc + cur.quantity), 0);
    setCartCount(newCartCount);
  }, [cartItems]);
  
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount };
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}