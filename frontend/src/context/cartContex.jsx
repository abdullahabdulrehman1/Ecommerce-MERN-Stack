import { createContext, useContext, useState } from "react";

const cartContext = createContext();
export const CreateCartContext = ({ children }) => {
  const [cart, setCart] = useState([]);
    
  const addToCart = (newProduct) => {
     setCart((prevCart) => [...prevCart, newProduct]);
    console.log(cart);
  };
  const deleteFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };
  const value = {
    cart,
    addToCart,
    deleteFromCart,
  };

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};

export const useCartContext = () => {
  return useContext(cartContext);
};
export default {
  useCartContext,
  CreateCartContext,
};