import React from "react";
import { useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinners from "../spinners";
import AdminDashboard from "../pages/admin/admindashboard";
// import { useDispatchContext, useStateContext } from "../../context/authRoute";
import UserRoute from "./userroute";
import { useAuth } from "../../context/authRoute";
import url from "../../utils/exporturl";
const AdminRoute = () => {
  const { authuser, setauthuser, isloggedin, setisloggedin } = useAuth();
  const [success, setsuccess] = useState(false);
  const [loading, setLoading] = useState(true); // Add this line
  const navigate = useNavigate();
  useEffect(() => {
    const Authcheck = async () => {
      setLoading(true); // Start loading

      try {
        // Check if the token is expired
        const token = localStorage.getItem("token");

        // Get token from local storage

        if (token) {
          axios.defaults.headers.common["Authorization"] = token;
          const response = await axios.get(`${url}/auth/admin-auth`);

          if (response.data.success == true) {
            setauthuser(response.data.user);
            setsuccess(true);
          } else {
            // The token is invalid, remove it from local storage
            setsuccess(false);
            localStorage.removeItem("token");
            // localStorage.removeItem("user");
          }
        } else {
          setsuccess(false);
          // localStorage.removeItem("token");
        }
      } catch (error) {
        // An error occurred, remove the token from local storage

        console.log(error);

        localStorage.removeItem("token");
        // localStorage.removeItem("user");
      }

      setLoading(false); // Stop loading
    };

    Authcheck();
  }, [setauthuser,setisloggedin,success]);
  if (loading) {
    return <Spinners />;
  }

  return success ? <Outlet /> : <Spinners path={"/login"} />;
};

export default AdminRoute;
