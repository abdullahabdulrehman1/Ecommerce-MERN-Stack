import React, { useState, useEffect } from "react";
import Layout from "../../layout/layout";
import UserMenu from "../../layout/usermenu";
import { Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import {motion }from "framer-motion"; 
const UserProfile = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const variants = {
    initial: { perspective: 0 },
    animate: { perspective: 1000 },
  };
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    question: "",
  });

  useEffect(() => {
    // Fetch user data from the server
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${url}/auth/user`);
        const { name, email, question } = response.data;
        setUserData({
          name,
          email,
          password: "",
          question,
        });
      } catch (error) {
        setError("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, email, password, question } = userData;
    // Check if name, email, and password are not empty
    if (!name || !email || !password || !question) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Update user data on the server
      await axios.put(`${url}/auth/user`, userData);
      setError("");
      navigate("/login");
    } catch (error) {
      setError("Failed to update user data.");
    }
  };

  return (
    <Layout title={"Ecommerce | UserProfile"}>
      <div className="container border border-black mx-auto rounded-lg">
        <div className="row grid grid-cols-12 row-span-2 justify-between">
          <div className="lg:col-span-3 md:col-span-12 sm:col-span-12 xs:col-span-12 col-span-12 row-span-1 border">
            <UserMenu />
          </div>
          <div className="lg:col-span-9 md:col-span-9 flex-col ml-10 flex-wrap  col-span-12 sm:px-2    md:px-5 lg:px-10 pt-2 ">
            {" "}
            <Typography level="h3" fontWeight="thin" sx={{ mt: 2, mx: 2 }}>
              Your Profile
            </Typography>
            <Box sx={{ height: "full", width: "full" }}>
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
              className=" flex items-center justify-center mx-auto sm:my-20   md:my-20 ">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                      Edit Profile
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Your email
                        </label>
                        <input
                          type="email"
                          typeof="email"
                          name="email"
                          id="email"
                          value={userData.email}
                          onChange={handleChange}
                          className="block w-full p-3 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Your name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={userData.name}
                          onChange={handleChange}
                          className="block name w-full p-3 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          value={userData.password}
                          onChange={handleChange}
                          className="block w-full p-3 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Security Question
                        </label>
                        <input
                          type="question"
                          name="question"
                          id="question"
                          placeholder="What is your favourite color?"
                          value={userData.question}
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
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </motion.div>
            </Box>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default UserProfile;
