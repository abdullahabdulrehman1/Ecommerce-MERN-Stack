import React, { useEffect } from "react";
import Layout from "../layout/layout";
import url from "../../utils/exporturl";
import axios from "axios";
import { useCartContext } from "../../context/cartContex";
import { useState } from "react";
import { toast } from "react-toastify";
const Cart = () => {
  const { cart, addToCart, deleteFromCart } = useCartContext();
  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const [productss, setProductss] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post(`${url}/product/fetchproductcart`, {
          productIds: cart,
        });
        const data = response.data;
        if (data && data.products) {
          setProductss(
            data.products.map((product) => {
              return {
                _id: product._id,
                name: product.name,
                description: product.description,
                quantity: product.quantity,
                price: product.price,
                slug: product.slug,
                category: product.category,
              };
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [cart]);
  console.log(productss);
  return (
    <Layout title={"Ecommerce | Cart"} className="overflow-hidden">
      <div className=" mx-auto my-4 container">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 row">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
          </div>
          <div className="mx-auto mt-8 max-w-md ">
            <div className="rounded-3xl bg-white shadow-lg">
              <div className="px-4 py-6 sm:px-8 sm:py-10">
                <div className="flow-root">
                  <ul className="-my-8">
                    {productss.length === 0 ? (
                      <></>
                    ) : (
                      productss.map((product) => {
                        return (
                          <li
                            className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                            key={product._id}
                          >
                            <div className="shrink-0 relative">
                              <span className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">
                                {/* {product.quantity} */}
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
                                    {product.description}
                                  </p>
                                </div>
                                <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                  <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                    {product.price}
                                  </p>
                                </div>
                              </div>
                              <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                                <button
                                  type="button"
                                  className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                                >
                                  <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    onClick={() => {
                                      deleteFromCart(product._id);
                                    }}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"
                                      className=""
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </li>
                        );
                      })
                    )}
                  </ul>
                </div>
                <div className="mt-6 space-y-3 border-t border-b py-8">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Subtotal</p>
                    <p className="text-lg font-semibold text-gray-900">
                      $2399.00
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Shipping</p>
                    <p className="text-lg font-semibold text-gray-900">$8.00</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    <span className="text-xs font-normal text-gray-400">
                      USD
                    </span>{" "}
                    2499.00
                  </p>
                </div>
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    className="group inline-flex w-full items-center justify-center rounded-md bg-gray-800 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
