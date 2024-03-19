import React, { useState, useEffect } from "react";
import UserMenu from "../../layout/usermenu";
import axios from "axios";
import Layout from "../../layout/layout";
import { Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authRoute";
import url from "../../../utils/exporturl";

const Order = () => {
  const [order, setOrder] = useState([]);
  const { authuser, setauthuser, isloggedin, setisloggedin } = useAuth();
  // const parseauthuser = JSON.parse(authuser);
  const getOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get(`${url}/order/getorder/${authuser.id}`); 
      console.log(authuser.id)
      // setOrder(data.order);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (authuser || isloggedin) {
      getOrders();
    }
  }, []);

  return (
    <Layout title={"Ecommerce | All Orders"}>
      <div className="container border border-black mx-auto rounded-lg">
        <div className="row grid grid-cols-12 row-span-2 justify-between">
          <div className="col-span-3 row-span-1 border ">
            <UserMenu />
          </div>
          <div className="col-span-9  px-10 py-1">
            <Typography level="h3" fontWeight="thin" sx={{ mt: 2, mx: 2 }}>
              All Orders
            </Typography>
            {order}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
