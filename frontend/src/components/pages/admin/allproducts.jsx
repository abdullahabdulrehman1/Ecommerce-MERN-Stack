import React, { useState, useEffect } from "react";
import Layout from "../../layout/layout.jsx";
import AdminMenu from "../../layout/adminmenu.jsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { toast } from "react-toastify";
import axios from "axios";
import url from "../../../utils/exporturl.jsx";
import { DataGrid } from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Pagination from "@mui/material/Pagination";
import CardContent from "@mui/material/CardContent";
// import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import CardMedia from "@mui/material/CardMedia";
// import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from "@mui/material";
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
    <Layout title={"Ecommerce | All-Products"}>
      <Container fixed maxWidth="false" sx={{ border: "3px solid black" }}>
        <Stack
          direction={{ md: "row", sm: "column", xs: "column" }}
          justifyContent={{ md: "start", sm: "center", xs: "center" }}
          alignItems={{ md: "flex-start", sm: "center", xs: "center" }}
          spacing={2}
        >
          <Box sx={{ width: { xs: "100%", sm: "50%", md: "25%" } }}>
            <AdminMenu />
          </Box>
          <Box sx={{ width: { xs: "100%", sm: "50%", md: "75%" } }}>
            <Typography variant="h5" sx={{ mt: 2 }}>
              All Products
            </Typography>
            <Divider sx={{ my: 2 }} />
            {loading ? (<Box
 display="flex"
 justifyContent="center"
 alignItems={"center"}
 minHeight={300}
 sx={{ marginY: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box
                p={2}
                sx={{ display: "inline-list-item" }}
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
                      alignItems={"stretch"}
                      flexWrap="wrap"
                      key={product.id}
                    >
                      <Card
                        sx={{
                          minWidth: 240,
                          maxWidth: 240,
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
                            // width="100"/
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
                              // overflow={"scrollable"}
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
             {loading? (<></>):( <Pagination
                count={Math.ceil(product.length / itemperpage)}
                page={page}
                onChange={handleChange}
                color="primary"
              />)}
            </Box>
          </Box>
        </Stack>
      </Container>
    </Layout>
  );
};

export default AllProducts;
