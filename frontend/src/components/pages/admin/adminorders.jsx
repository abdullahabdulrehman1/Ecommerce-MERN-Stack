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
import Button from "@mui/material/Button";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import moment from "moment";
import { OrderList } from "primereact/orderlist";
import CircularProgress from "@mui/material/CircularProgress";
import AdminMenu from "../../layout/adminmenu";

const AdminOrders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState([{}]);
  const [products, setProducts] = useState([{}]);
  const { authuser, setauthuser, isloggedin, setisloggedin } = useAuth();
  const getOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get(`${url}/order/getadminorders`);

      console.log(authuser.id);
      setOrder(response.data);
      // Flatten the products array for all orders
      const allProducts = response.data.flatMap((order) =>
        order.products
          .map((product) => ({
            ...product,
            orderid: order._id,
            ispaid: order.ispaid,
            ordername: order.name,
            useremail: order.email,
            createdAt: order.createdAt,
            shippingAddress: order.shippingAddress, // Add this line
          }))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
      setProducts(allProducts);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    getOrders().then(() => {
      setIsLoading(false);
    });
  }, []);
  const getUpdatedOrder = async () => {
    try {
      const promises = products.map(async (product) => {
        const res = await axios.get(
          `${url}/order/getmyorderstatus/${product.orderid}`
        );
        return res.data;
      });

      const updatedOrders = await Promise.all(promises);

      setOrder(updatedOrders);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(products);

  useEffect(() => {
    getUpdatedOrder();
  }, [products]);

  const orderDataTemplate = (rowData) => {
    return <span>{moment(rowData.createdAt).format("DD-MM-YYYY")}</span>;
  };
  const rowDataTemplate = (rowData) => {
    const imageUrl = `${url}/product/getphotoproduct/${rowData._id}`;
    // console.log(rowData._id);
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
  const shippingAddressTemplate = (rowData) => {
    // const { shippingAddress } = rowData;
    return (
      <div>
        {rowData.shippingAddress ? (
          <>
            <div>
              {rowData.shippingAddress.line1},{rowData.shippingAddress.city},
              {rowData.shippingAddress.country},
              {rowData.shippingAddress.postalCode}
            </div>
          </>
        ) : (
          <div>No shipping address provided</div>
        )}
      </div>
    );
  };
  const paymentStatusTemplate = (rowData) => {
    return (
      <>
        <div>{rowData.ispaid}</div>
        {!rowData.ispaid === "paid" && (
          <Button
            sx={{
              color: "grey",
              border: "grey 1px solid",
              ":hover": { border: "black 1px solid " },
            }}
            variant="outlined"
            onClick={getUpdatedOrder}
          >
            Refresh
          </Button>
        )}
      </>
    );
  };
  return (
    <Layout title={"Ecommerce | All Orders"}>
      <div className="container border  border-black mx-auto rounded-lg">
        <div
          className="row grid grid-cols-12 row-span-2 justify-between"
          style={{ minHeight: "80vh" }}
        >
          <div className="lg:col-span-3 md:col-span-3 col-span-12 row-span-1 border ">
            <AdminMenu />
          </div>
          <div className="lg:col-span-9 md:col-span-9 flex-col  ml-10  flex-wrap  col-span-12 sm:px-2    md:px-5 lg:px-10 pt-2 ">
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
            ) : isLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "80vh",
                }}
              >
                <CircularProgress style={{ color: "grey" }} />
              </div>
            ) : (
              <DataTable
                value={products}
                header={header}
                style={{ minWidth: "20rem" }}
                footer={footer}
                tableStyle={{ minWidth: "60rem", marginTop: "45px" }}
                className="p-datatable-gridlines"
                paginator={true}
                paginatorPosition={"bottom"}
                paginatorLeft={true}
                rows={5}
                activePage={1}
              >
                <Column
                  field="name"
                  style={{ minWidth: "2rem", maxWidth: "10rem" }}
                  header="Product Name"
                  bodyStyle={{ textAlign: "center" }}
                ></Column>
                <Column
                  header="Product Image"
                  body={rowDataTemplate}
                  bodyStyle={{ textAlign: "center" }}
                ></Column>
                <Column
                  field="price"
                  header="Price"
                  bodyStyle={{ textAlign: "center" }}
                ></Column>
                <Column
                  field="salequantity"
                  header="Quantity"
                  bodyStyle={{ textAlign: "center" }}
                ></Column>
                <Column
                  header="Status"
                  field="ispaid"
                  body={paymentStatusTemplate}
                  bodyStyle={{ textAlign: "center" }}
                ></Column>
                <Column
                  header="Order Date"
                  body={orderDataTemplate}
                  field={"createdAt"}
                  bodyStyle={{ textAlign: "center" }}
                ></Column>
                <Column
                  header="Email Address"
                  field="useremail"
                  // body={shippingAddressTemplate}
                  bodyStyle={{ textAlign: "start" }}
                ></Column>
                <Column
                  header="Shipping Address"
                  body={shippingAddressTemplate}
                  bodyStyle={{ textAlign: "start" }}
                ></Column>
              </DataTable>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
