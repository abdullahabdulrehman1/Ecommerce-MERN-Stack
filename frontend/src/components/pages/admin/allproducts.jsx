import React, { useState, useEffect } from "react";
import Layout from "../../layout/layout.jsx";
import AdminMenu from "../../layout/adminmenu.jsx";
import axios from "axios";
import url from "../../../utils/exporturl.jsx";

import {
  Stack,
  CircularProgress,
  Typography,
  Divider,
  Box,
  Button,
  Card,
  Modal,
  Pagination,
  CardContent,
  Container,
  CardMedia,
  CardActionArea,
  CardActions,
} from "@mui/material";
const AllProducts = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const [count, setCount] = useState([]);
  const [page, setPage] = useState(1);

  const itemperpage = 10;
  const start = (page - 1) * itemperpage;
  const end = start + itemperpage;
  const handleChange = (event, value) => {
    setPage(value);
  };
  const getAllProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get(`${url}/product/getallproduct`);
      const data = response.data;
      return (
        setLoading(false),
        setProduct(
          data.getproduct.map((product) => {
            return {
              id: product._id,
              name: product.name,
              description: product.description,
              quantity: product.quantity,
              price: product.price,
              // categoryName: product.category?.name,
            };
          })
        )
      );
    } catch (error) {
      setLoading(false);
      setError("Error fetching products");
      console.log("getAllProducts function error: " + error);
    }
  };
  useEffect(() => {
    setLoading(true);
    getAllProducts();
  }, []);
  console.log(product);
  return (
    <Layout title={"Ecommerce | Create-Category"}>
      <div className="container border border-black mx-auto rounded-lg">
        <div className="row grid grid-cols-12 row-span-auto justify-between">
          <div className="lg:col-span-3 md:col-span-3 col-span-12 row-span-1 border ">
            <AdminMenu />
          </div>
          <div className="lg:col-span-9 md:col-span-9 flex-col ml-10 flex-wrap  col-span-12 sm:px-2    md:px-5 lg:px-10 pt-2 ">
            <Typography variant="h5" sx={{ mt: 2 }}>
              All Products
            </Typography>
            <Divider sx={{ my: 2 }} />
            {loading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems={"center"}
                minHeight={300}
                sx={{ marginY: 2 }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Box
                p={2}
                sx={{
                  display: "inline-list-item",
                  flexWrap: "wrap",
                  justifyContent: "start",
                }}
                gap={4}
                // alignItems={"stretch"}
                // justifyContent={"space-evenly"}
                // useFlexGap
                flexWrap="wrap"
              >
                {product.slice(start, end).map((product) => {
                  return (
                    <Stack
                      direction="row"
                      justifyContent={"start"}
                      alignItems={"center"}
                      flexWrap="wrap"
                      key={product.id}
                    >
                      <Card
                        sx={{
                          minWidth: 210,
                          maxWidth: 210,
                          maxHeight: 350,
                          minHeight: 350,
                          backgroundColor: "#f7f7f7",
                          // my: 4,
                          border: "none",
                          borderRadius: "20px",
                          boxShadow:
                            "10px 10px 15px 2px rgba(150, 247, 208, 0.8)",
                        }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="130"
                            sx={{
                              minHeight: 180,
                              maxHeight: 180,
                              objectFit: "cover",
                              boxShadow: "2px 0.5px 5px ",
                              borderRadius: "20px",
                            }}
                            image={`${url}/product/getphotoproduct/${product.id}`}
                            alt="green iguana"
                          />
                          <CardContent sx={{ paddingX: 3 }}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              align="justify"
                              component="div"
                              overflow={"clip"}
                            >
                              {product.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              align="justify"
                              color="text.secondary"
                              sx={{ maxLines: 3, textOverflow: "ellipsis" }}
                            >
                              {product.description}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Typography
                            gutterBottom
                            variant="body1"
                            align="justify"
                            component="div"
                            overflow={"clip"}
                          >
                            $ {product.price}
                          </Typography>
                        </CardActions>
                      </Card>
                    </Stack>
                  );
                })}
              </Box>
            )}
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems={"center"}
              sx={{ marginY: 2 }}
            >
              {loading ? (
                <></>
              ) : (
                <Pagination
                  count={Math.ceil(product.length / itemperpage)}
                  page={page}
                  onChange={handleChange}
                  color="primary"
                />
              )}
            </Box>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllProducts;
