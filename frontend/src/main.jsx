import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/authRoute.jsx";
// import { SearchProvider } from "./context/searchRoute.jsx";
import { CreateCartContext } from "./context/cartContex.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CreateCartContext>
      <ToastContainer />
      <App />
    </CreateCartContext>
  </AuthProvider>
);
