import React, { useState, useEffect, useContext } from "react";
import Layout from "../../layout/layout";
import UserMenu from "../../layout/usermenu";
import { Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import { AuthContext, useAuth } from "../../../context/authRoute";
import url from "../../../utils/exporturl";
import { toast } from "react-toastify";
const UserProfile = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const variants = {
    initial: { perspective: 0 },
    animate: { perspective: 1000 },
  };
  const { authuser, setauthuser } = useAuth();
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    try {
      axios.defaults.headers.common["Authorization"] = token;
      const res = await axios.get(`${url}/auth/fetch-user/${authuser.id}`);
      console.log(res.data);
      setUserData({
        id: res.data.user.id,
        name: res.data.user.name,
        email: res.data.user.email,
        question: res.data.user.question,
      });
    } catch (error) {
      setError("Failed to fetch user data.");
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    console.log(authuser);
  }, [authuser]);
 
  const [userData, setUserData] = useState({
   id: authuser.id,
    name: authuser.name,
    email: authuser.email,
    password: "",
    samepassword: "",
    question: authuser.question,

  });

  

  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    
    try {
      axios.defaults.headers.common["Authorization"] = token;
      const res = await axios.put(`${url}/auth/update-user/${authuser.id}`, userData);
      setError("");
      if(res.data.success === true){
        fetchUser();
        setError(`${res.data.message}`);
        console.log(res.data.user)
        // Update authuser state with the updated user data

        setUserData({
          id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email,
          // password: res.data.user.password,
          // samepassword: res.data.user.samepassword,
          question: res.data.user.question,
        });
        setauthuser({
          id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email,
          // password: res.data.user.password,

          question: res.data.user.question
        })
        // Update userData state with the updated user data
     
        // Navigate to another page or refresh the current page
        // navigate("/some-page");
        // window.location.reload();
      }
    } catch (error) {
      setError("Failed to update user data.");
    }
  };

  console.log(authuser);
  console.log(userData)
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
                className=" flex items-center justify-center mx-auto sm:my-20   md:my-20 "
              >
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                      Edit Profile
                    </h1>
                    <form
                      className="space-y-4 md:space-y-6"
                      onSubmit={handleSubmit}
                    >
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
                          disabled
                          // placeholder={authuser.email}
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
                         Confirm Password
                        </label>
                        <input
                          type="password"
                          name="samepassword"
                          id="samepassword"
                          value={userData.samepassword}
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
                          // onClick={handleSubmit}
                          // onSubmit={handleSubmit}
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
