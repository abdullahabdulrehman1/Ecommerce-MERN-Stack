import React, { useState, useEffect } from "react";
import UserMenu from "../../layout/usermenu";
import axios from "axios";
import Layout from "../../layout/layout";
import { Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authRoute";
import url from "../../../utils/exporturl";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import moment from "moment";
import { OrderList } from "primereact/orderlist";
const Order = () => {
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([{}]);
  const { authuser, setauthuser, isloggedin, setisloggedin } = useAuth();
  const getOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get(`${url}/order/getorder/${authuser.id}`);
      console.log(authuser.id);
      setOrder(response.data);
      // Flatten the products array for all orders
      const allProducts = response.data.flatMap((order) => order.products);
      setProducts(allProducts);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (authuser || isloggedin) {
      getOrders();
    }
  }, []);
  const orderDataTemplate = (rowData) => {
    order.map((orders)=>{
      const date = moment(orders.createdAt);
      const now = moment();
  
      if (date.isSame(now, "day")) {
        return "Today";
      } else if (date.isSame(now.clone().subtract(1, "day"), "day")) {
        return "Yesterday";
      } else if (date.isSame(now.clone().add(1, "day"), "day")) {
        return "Tomorrow";
      } else {
        return date.format("DD/MM/YYYY");
      }

    })
   
  };
  const rowDataTemplate = (rowData) => {
    const imageUrl = `${url}/product/getphotoproduct/${rowData._id}`;
    return (
      <img
        src={imageUrl}
        alt={products.name}
        style={{ height: "120px", width: "180px" }}
        className="shadow-2 border-round"
      />
    );
  };
  const header = (
    <Typography
      level="h3"
      fontWeight="thin"
      sx={{ textAlign: "inherit", marginY: "5%" }}
    >
      All Orders
    </Typography>
  );
  const footer = `In total there are ${
    products ? products.length : 0
  } products Ordered.`;

  return (
    <Layout title={"Ecommerce | All Orders"}>
      <div className="container border border-black mx-auto rounded-lg">
        <div className="row grid grid-cols-12 row-span-2 justify-between">
          <div className="col-span-3 row-span-1 border h-96 ">
            <UserMenu />
          </div>
          <div className="lg:col-span-9 md:col-span-9 flex-col ml-10 flex-wrap  col-span-12 sm:px-2    md:px-5 lg:px-10 pt-2 ">
            {order === null ? (
              <Typography level="h3" fontWeight="thin" sx={{ my: 3, mx: 2 }}>
                All Orders
              </Typography>
            ) : null}

            {order === null ? (
              <Typography
                level="h3"
                fontWeight="thin"
                sx={{ textAlign: "center", marginY: "15%" }}
              >
                No Orders Found
              </Typography>
            ) : (
              <DataTable
                value={products}
                header={header}
                style={{ minWidth: "20rem" }}
                footer={footer}
                tableStyle={{ minWidth: "60rem", marginTop: "45px" }}
                className="p-datatable-gridlines"
              >
                <Column
                  field="name"
                  style={{ minWidth: "2rem", maxWidth: "10rem" }}
                  header="Name"
                ></Column>
                <Column header="Image" body={rowDataTemplate}></Column>
                <Column field="price" header="Price" body={""}></Column>
                <Column field="salequantity" header="Quantity"></Column>
                <Column header="Status" body={""}></Column>
                <Column
                  header="Date"
                  body={orderDataTemplate}
                  field={"createdAt"}
                ></Column>
              </DataTable>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
