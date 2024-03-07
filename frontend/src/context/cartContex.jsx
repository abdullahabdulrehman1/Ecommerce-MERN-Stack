import { createContext, useContext, useEffect, useState } from "react";

const cartContext = createContext();
export const CreateCartContext = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (newProduct) => {
    setCart((prevCart) => [...prevCart, newProduct]);
    console.log(cart);
  };
  const deleteFromCart = (id) => {
   const  mycart =[...cart];
    const newCart = cart.findIndex(product => product._id === id);
    mycart.splice(newCart, 1);
    setCart(mycart);
    localStorage.setItem('cart', JSON.stringify(mycart));
  };

  const value = {
    cart,
    addToCart,
    deleteFromCart,
  };
  useEffect(() => {
    let existingCart = localStorage.getItem("cart");
    if (existingCart) {
      setCart(JSON.parse(existingCart));
    }
    console.log(cart);
  }, []);

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};

export const useCartContext = () => {
  return useContext(cartContext);
};
export default {
  useCartContext,
  CreateCartContext,
};
