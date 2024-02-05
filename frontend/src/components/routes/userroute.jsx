import React from "react";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinners from "../spinners";
import { useAuth } from "../../context/authRoute";
import url from "../../utils/exporturl";
// import { useDispatchContext, useStateContext } from "../../context/authRoute";

const UserRoute = () => {
  const { authuser, setauthuser, isloggedin, setisloggedin } = useAuth();

  // const { token } = useStateContext();
  // const dispatch = useDispatchContext();
  const [success, setsuccess] = useState(false);
  const [loading, setLoading] = useState(true); // Add this line
  useEffect(() => {
    const Authcheck = async () => {
      try {
        const token = localStorage.getItem("token");
        setLoading(true);
       
        if (token) {
          axios.defaults.headers.common["Authorization"] = token;

          const res = await axios.get(`${url}/user-auth`)
          setauthuser(res.data.user);
          setisloggedin(true);
          console.log(res.data);
          console.log(res.data.message);
          console.log(res.data.success);
          console.log(res.data)
          if (res.data.success === true ) {
            setsuccess(true); 
          } else {
            localStorage.removeItem("token");
            setsuccess(false);
              
            // localStorage.removeItem('user');
          }
          
         
            // setsuccess(false);
          
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
    Authcheck();
  }, []);

  if (loading) {
    return <Spinners />;
  }

  return success ? <Outlet /> : <Spinners path={"/login"} />;
};

export default UserRoute;
