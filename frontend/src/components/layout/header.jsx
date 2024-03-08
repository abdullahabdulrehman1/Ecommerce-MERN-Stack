import React, { useContext, useEffect, useState } from "react";
import { MdShoppingCart } from "react-icons/md";
import { AiOutlineLogin } from "react-icons/ai";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authRoute";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/cartContex";
const Header = () => {
  const { authuser, setauthuser, isloggedin, setisloggedin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        setisloggedin(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, [setisloggedin]);
  const handlelogout = () => {
    localStorage.removeItem("token");

    toast.error("Logout Successfully");
  };

  return (
    <div>
      <nav className="container mx-auto rounded-lg my-5 bg-white border border-gray-600 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Ecommerce Store
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={toggleNavbar}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              isOpen ? "flex" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white ">
              <li>
                <Link
                  to="/"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={`/dashboard/${
                    Number(authuser.role) == 1 ? "admin" : "user"
                  }`}
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0    "
                >
                  Dashboard
                </Link>
              </li>
              <li className="">
                <Link
                  to="/cart"
                  className="flex flex-wrap align-center py-0 pl-3 pr-4 relative   text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
                >
                  <span className="mr-1 "> Cart</span>
                  <span className=" mr-2  mt-1">
                    <MdShoppingCart />
                  </span>
                  {cartItems ? (
                    <span className="absolute right-0 top-0 md:translate-x-5 sm:translate-x-0  rounded-full bg-red-600 w-7 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">
                      {cartItems.length && cartItems.length >= 99
                        ? "99+"
                        : cartItems.length}
                    </span>
                  ) : (
                    <></>
                  )}
                </Link>
              </li>
              {!isloggedin ? (
                <>
                  {" "}
                  <li>
                    <Link
                      to="/register"
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="flex py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
                    >
                      <span className="mt-1 mr-2">
                        {" "}
                        <AiOutlineLogin />{" "}
                      </span>
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li
                    onClick={() => {
                      handlelogout();
                      window.location.reload();
                    }}
                  >
                    <Link
                      to="/"
                      className="flex py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                    >
                      <span className="mt-1 mr-2">
                        {" "}
                        <AiOutlineLogin />{" "}
                      </span>
                      Logout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
