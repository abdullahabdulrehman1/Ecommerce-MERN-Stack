import React, { useState, useEffect } from "react";
import Layout from "../../layout/layout";
import dotenv from "dotenv";

// dotenv.config();
// dotenv.config();
// import { toast} from 'react-toastify';
import { ToastContainer, toast } from "react-toastify";
// import dotenv from 'dotenv';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import url from "../../../utils/exporturl";
const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    question: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, email, password, question } = formData;
    // Check if name, email, and password are not empty
    if (!name || !email || !password || !question) {
      // toast.error("Please fill in all fields.");
      setError("Please fill in all fields.");
      return;
    }

    // Create a data object to send to the server
    const data = {
      name,
      question,
      email,
      password,
      // question,
    };

    const res = axios
      .post(`${url}/auth/register`, data)
      .then((response) => {
        // Handle success - you can redirect or show a success message

        setFormData({
          name: "",
          email: "",
          password: "",
          question: "",
        });
        toast.success("Registration successful!");
        setError("");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(`${error.response.data.message}`);
        // Handle errors - display an error message using toast
        setError(`${error.response.data.message}`);
      });
  };

  // const er='';
  return (
    <Layout title={"Registeration | Ecommerce"}>
      <div className="dark:bg-gray-900  light:bg-white-500">
        <div className="flex flex-col items-center justify-center px-6 py-0 mx-auto md:h-5/6 md:my-20 lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6  text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2 rounded-3xl"
              src="/public/aboutus.jpg"
              alt="logo"
            />
            Ecommerce
          </a>

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    typeof="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full p-3 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block name w-full p-3 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full p-3 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Security Question
                  </label>
                  <input
                    type="question"
                    name="question"
                    id="question"
                    placeholder="What is your favourite color?"
                    value={formData.question}
                    onChange={handleChange}
                    className="block w-full p-3 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    required
                  />
                </div>
                <h1>
                  {" "}
                  {error && (
                    <span className="text-red-500 text-lg font-bold ">
                      {error}
                    </span>
                  )}
                </h1>

                <div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full py-3 text-white bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"
                  >
                    Create account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
