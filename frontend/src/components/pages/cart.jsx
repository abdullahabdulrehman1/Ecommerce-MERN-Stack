import React, { useEffect } from "react";
import Layout from "../layout/layout";
import url from "../../utils/exporturl";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { CloseRounded } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../../context/cartContex";
import { loadStripe } from "@stripe/stripe-js";
import {
  motion,
  AnimatePresence,
  MotionValue,
  useSpring,
  useTransform,
  Reorder,
} from "framer-motion";
import { useAuth } from "../../context/authRoute";
import Login from "./Auth/login";
import { useNavigate } from "react-router-dom";
import { MdBookmarkBorder } from "react-icons/md";
import { publicstripekey } from "../../utils/stripekey";

const Cart = () => {
  const [popLayout, setPopLayout] = useState(false);
  const [productss, setProductss] = useState([]);
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(false);
  const [success, setsuccess] = useState(false);
  const variants = {
    initial: { perspective: 0 },
    animate: { perspective: 1000 },
  };
  const { authuser, setauthuser, isloggedin, setisloggedin } = useAuth();

  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    deletesingleproduct,
    getCartTotal,
  } = useContext(CartContext);

  const total = getCartTotal();
  // const { isloggedin } = useAuth();
  const navigate = useNavigate();
  //payment integration
  const token = localStorage.getItem("token");

  const makeOrder = async () => {
    const stripe = await loadStripe(`${publicstripekey}`);
    // const stripe = {
    //   products: cartItems,
    //   total: total,
    // };
    // const body = { products: cartItems, total: total };
    const headers = {
      "content-type": "application/json",
    };
    axios.defaults.headers.common["Authorization"] = token;

    const res = await axios.post(`${url}/order/createorder`, {
      products: cartItems,
      total: total,
      user: authuser,
    });
    console.log(res.data.id);
    const result = await stripe.redirectToCheckout({
      sessionId: res.data.id,
    });
    console.log(result);

    if (res.status === 200) {
      toast.success("Order Placed Successfully");
      clearCart();
    } else {
      toast.error("Order Not Placed");
      console.log(res);
    }
  };
  const AuthCheck = async () => {
    try {
      // setLoading(true);
      if (token) {
        axios.defaults.headers.common["Authorization"] = token;
        const res = await axios.get(`${url}/auth/user-auth`);
        setauthuser(res.data.user);
        setisloggedin(true);
        console.log(res.data);
        console.log(res.data.message);
        console.log(res.data.success);
        console.log(res.data);

        if (res.data.success === true) {
          setsuccess(true);
        } else {
          localStorage.removeItem("token");
          setsuccess(false);
        }
      }
    } catch (err) {
      if (err.response && err.response.data.success === false) {
        localStorage.removeItem("token");
        setsuccess(false);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    AuthCheck();
  }, []);
  return (
    <Layout title={"Ecommerce | Cart"} className="overflow-hidden">
      <div className=" mx-auto my-4 container">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 row">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
          </div>
          <motion.div
            layout
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            variants={variants}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "tween" }}
            className="mx-auto mt-8 max-w-md "
          >
            <div className="rounded-3xl bg-white shadow-lg">
              <div className="px-4 py-6 sm:px-8 sm:py-10">
                <div className="flow-root">
                  <Reorder.Group
                    axis="y"
                    values={items}
                    onReorder={setItems}
                    className="-my-8"
                  >
                    {cartItems.length === 0 ? (
                      <>
                        <Typography variant="h6" textAlign={"center"}>
                          No Product in Cart
                        </Typography>
                      </>
                    ) : (
                      <AnimatePresence mode={popLayout ? "popLayout" : "sync"}>
                        {cartItems.map((product) => {
                          return (
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              layout
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{
                                scale: 1,
                                opacity: 1,
                              }}
                              variants={variants}
                              exit={{ scale: 0.8, opacity: 0 }}
                              transition={{ type: "spring" }}
                              key={product._id}
                            >
                              <Reorder.Item
                                value={product}
                                key={product}
                                className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                              >
                                <div className="shrink-0 relative">
                                  <span
                                    className="absolute top-1 left-1 flex h-6 w-34 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2"
                                    style={{
                                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                    }}
                                  >
                                    {product.availablequantity <
                                    product.salequantity
                                      ? 0
                                      : product.availablequantity -
                                        product.salequantity}{" "}
                                    left
                                  </span>

                                  <img
                                    className="h-24 w-24 max-w-full rounded-lg object-cover"
                                    src={`${url}/product/getphotoproduct/${product._id}`}
                                    loading="lazy"
                                    alt=""
                                  />
                                </div>
                                <div className="relative flex flex-1 flex-col justify-between">
                                  <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                    <div className="pr-8 sm:pr-5">
                                      <p className="text-base font-semibold text-gray-900">
                                        {product.name}
                                      </p>
                                      <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                                        {product.category.name}
                                      </p>
                                    </div>
                                    <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                      <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                        {product.price} PKR
                                      </p>
                                    </div>
                                  </div>
                                  <div className="absolute top-0 right-0  flex sm:bottom-0 sm:top-auto">
                                    <button
                                      type="button"
                                      className="flex rounded p-0 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                                      disabled={product.salequantity === 0}
                                      onClick={() => {
                                        deletesingleproduct(product);
                                        // removeFromCart(product);
                                        // console.log('clicked')
                                      }}
                                    >
                                      <CloseRounded />
                                    </button>
                                  </div>
                                  <div className="flex items-center ">
                                    <button
                                      className="px-2 mx-2   text-gray-800 text-xs font-bold uppercase rounded-lg  border-2 border-gray-800 "
                                      disabled={
                                        product.availablequantity <=
                                        product.salequantity
                                      }
                                      onClick={() => {
                                        addToCart(product);
                                      }}
                                    >
                                      +
                                    </button>
                                    <p>{product && product.salequantity}</p>
                                    <button
                                      className="px-2 mx-2   text-gray-800 text-xs font-bold uppercase rounded-lg    border-2 border-gray-800 "
                                      onClick={() => {
                                        removeFromCart(product);
                                      }}
                                    >
                                      -
                                    </button>
                                  </div>
                                </div>
                              </Reorder.Item>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    )}
                  </Reorder.Group>
                </div>
                <motion.div
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  variants={variants}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring" }}
                  className="mt-6 space-y-3 border-t border-b py-8"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Subtotal</p>
                    <p className="text-lg font-semibold text-gray-900">
                      PKR: {getCartTotal()}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Shipping</p>
                    <p className="text-lg font-semibold text-gray-900">PKR 0</p>
                  </div>
                </motion.div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    <span className="text-xs font-normal text-gray-400">
                      PKR
                    </span>{" "}
                    {getCartTotal()}
                  </p>
                </div>
                <motion.div
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  variants={variants}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "tween" }}
                  className="mt-6 text-center"
                >
                  {isloggedin ? (
                    <button
                      type="button"
                      className="group inline-flex w-full items-center justify-center rounded-md bg-gray-800 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                      onClick={() => {
                        if (cartItems.length === 0) {
                          toast.error("Cart is empty");
                        } else {
                          makeOrder();
                        }
                      }}
                    >
                      Place Order
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="group inline-flex w-full items-center justify-center rounded-md bg-gray-800 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                      onClick={() => {
                        if (cartItems.length === 0) {
                          toast.error("Cart is empty");
                        } else {
                          navigate("/login");
                        }
                      }}
                    >
                      Please Login to Place Order
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
