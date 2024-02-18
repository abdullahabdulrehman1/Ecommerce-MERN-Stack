import axios from "axios";
import { useAuth } from "../../context/authRoute";
import Layout from "../layout/layout";
import React, { useEffect, useState } from "react";
import url from "../../utils/exporturl";
import { Divider } from "@mui/material";
import { Box } from "@mui/material";
import { Pagination } from "@mui/material";
import { Stack } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import { prices } from "./price";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { toast } from "react-toastify";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useSearch } from "../../context/searchRoute";
import clsx from "clsx";
import { Modal as BaseModal } from "@mui/base/Modal";
import { get } from "superagent";
import ProductModal from "../../utils/productmodal";
import PropTypes from "prop-types";
import styled from "styled-components";
import { css } from "@mui/system";

import Modal from "@mui/material/Modal";
// import { TextField } from '@mui/material/TextField';
const Home = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const { authuser, setauthuser, isloggedin, setisloggedin } = useAuth();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [success, setsuccess] = useState(false);
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const itemperpage = 10;
  const start = (page - 1) * itemperpage;
  const [slug, setSlug] = useState("");
  const end = start + itemperpage;
  const Backdrop = React.forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return (
      <div
        className={clsx({ "base-Backdrop-open": open }, className)}
        ref={ref}
        {...other}
      />
    );
  });

  Backdrop.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
  };

  const AuthCheck = async () => {
    try {
      // setLoading(true);
      if (token) {
        axios.defaults.headers.common["Authorization"] = token;
        const res = await axios.get(`${url}/auth/user-auth`);
        setauthuser(res.data.user);
        setisloggedin(true);
        console.log(res.data);
        console.log(res.data.message);
        console.log(res.data.success);
        console.log(res.data);

        if (res.data.success === true) {
          setsuccess(true);
        } else {
          localStorage.removeItem("token");
          setsuccess(false);
        }
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
  useEffect(() => {
    AuthCheck();
  }, []);
  const handleOpen = (slug) => {
    console.log(slug);
    setSlug(slug);
getSingleProduct(slug);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };
  const [openCategory, setOpenCategory] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const [openPriceFilter, setOpenPriceFilter] = React.useState(true);

  const handleClick2 = () => {
    setOpenPriceFilter(!openPriceFilter);
  };
  const handleClickCategory = () => {
    setOpenCategory(!openCategory);
  };

  const getAllCategories = async () => {
    // setLoading(true);

    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get(`${url}/category/getcategory`);
      setLoading(false);

      return (
        setLoading(false),
        setCategories(
          response.data.allCategory.map((category) => {
            return {
              id: category._id,
              name: category.name,
            };
          })
        )
      );
    } catch (error) {
      setLoading(false);
      console.log("getAllCategories function error: " + error);
    }
  };
  const [singleProduct, setSingleProduct] = useState([]);
  

  const getAllProducts = async () => {
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
              _id: product._id,
              name: product.name,
              description: product.description,
              quantity: product.quantity,
              price: product.price,
              slug: product.slug,
              category: product.category,
            };
          })
        )
      );
    } catch (error) {
      setLoading(false);
      // setError("Error fetching products");
      console.log("getAllProducts function error: " + error);
    }
  };
  useEffect(() => {
    setLoading(true);
    getAllCategories();
  }, []);
  console.log(categories);
  const [checked, setChecked] = useState([]);
  const handlefilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  console.log(checked);
  const [radio, setRadio] = useState("");
  const [minPrice, maxPrice] = radio.split(",").map(Number);
  console.log(radio);
  const filterproduct = async () => {
    try {
      const response = await axios.post(`${url}/product/productfilter`, {
        checked,
        radio: [minPrice, maxPrice],
      });
      if (response.data.products === null) {
        console.log("No products found");
        toast.error("No products found");
        setLoading(false);
        toast.error("No products found");
      } else if (response.data && response.data.products) {
        setProduct(
          response.data.products.map((product) => {
            return {
              _id: product._id,
              name: product.name,
              description: product.description,
              quantity: product.quantity,
              price: product.price,
              slug: product.slug,
              category: product.category,
            };
          })
        );
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    // setLoading(true);
    if (!radio.length || !checked.length) getAllProducts();
  }, [checked.length, radio.length]);
  useEffect(() => {
    // setLoading(true);
    // console.log(product)
    if (radio.length || checked.length) filterproduct();
  }, [checked, radio]);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (search) {
        const response = await axios.get(
          `${url}/product/productsearch/${search}`
        );
        setProducts(
          response.data.products.map((product) => {
            return {
              _id: product._id,
              name: product.name,
              description: product.description,
              quantity: product.quantity,
              price: product.price,
              slug: product.slug,
              category: product.category,
            };
          })
        );
      } else {
        setProducts([]);
      }
    };

    fetchProducts();
  }, [search]);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
  };
  const getSingleProduct = async (slug) => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get(
        `${url}/product/getsingleproduct/${slug}`
      );
      const data = response.data;
      return (
        setLoading(false),
        console.log(data),
        setSingleProduct({
          id: data.singleProduct._id,
          name: data.singleProduct.name,
          description: data.singleProduct.description,
          quantity: data.singleProduct.quantity,
          price: data.singleProduct.price,
          slug: data.singleProduct.slug,
        })
      );
    } catch (error) {
      setLoading(false);
      setError("Error fetching products");
      console.log("getSingleProduct function error: " + error);
    }
  };

  return (
    <Layout title={open ? "Ecommerce | Product " : "Ecommerce | Home"}>
      <div className="container border border-black mx-auto rounded-lg">
        <div>
          {/* <Button onClick={handleOpenModal}>Open Child Modal</Button> */}
          <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style, width: "80%", height: "80%" }}>
             {
                singleProduct&&(

                  <div>
                    <h1>{singleProduct.name}</h1>
                    <p>{singleProduct.description}</p>
                    <p>{singleProduct.price}</p>
                    <p>{singleProduct.quantity}</p>
                    {/* <img src={`${url}/product/getphotoproduct/${singleProduct.id}`} alt="" height={/> */}
                  </div>
                )
             }
              
            </Box>
          </Modal>
        </div>
        <div className="row grid grid-cols-12 row-span-auto  ">
          <div className="lg:col-span-3    md:ml-5  sm:m-2  md:col-span-3 col-span-12 row-span-1  m-2 p-2 ">
            <Typography level="h3" fontWeight="thin" sx={{ mt: 2 }}>
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <TextField
              type="text"
              variant="outlined"
              color="primary"
              label="Search Products"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              fullWidth
            />
            <Box>
              <ListItemButton onClick={handleClickCategory}>
                <ListItemText primary="Filter By Category" />
                {openCategory ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              {categories?.map((category) => {
                return (
                  <Box key={category.id} sx={{ ml: 2 }}>
                    <Collapse in={openCategory} timeout="auto" unmountOnExit>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={(e) =>
                                handlefilter(e.target.checked, category.id)
                              }
                            />
                          }
                          label={`${category.name}`}
                        />
                      </FormGroup>
                    </Collapse>
                  </Box>
                );
              })}
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box>
              <ListItemButton onClick={handleClick2}>
                <ListItemText primary="Filter By Price" />
                {openPriceFilter ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              <RadioGroup
                value={radio}
                onChange={(e) => setRadio(e.target.value)}
                name="radio-buttons-group"
              >
                {prices?.map((price) => {
                  return (
                    <Box key={price._id} sx={{ ml: 2 }}>
                      <Collapse
                        in={openPriceFilter}
                        timeout="auto"
                        unmountOnExit
                      >
                        <FormControlLabel
                          value={price.array.join(",")}
                          control={<Radio />}
                          label={price.name}
                        />
                      </Collapse>
                    </Box>
                  );
                })}
              </RadioGroup>
            </Box>
            <Button
              sx={{ mt: 2, ml: 2 }}
              level="contained"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </Button>
          </div>

          <div className="lg:col-span-9 md:col-span-9    m-2  flex-wrap  col-span-12  pt-2 ">
            <Typography level="h3" fontWeight="thin" sx={{ mt: 2, mx: 2 }}>
              All Products
            </Typography>
            <Divider sx={{ my: 2 }} />

            {product.length === 0 ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems={"center"}
                minHeight={300}
                sx={{ marginY: 2 }}
              >
                <Typography level="h4">No products found</Typography>
              </Box>
            ) : (
              <Box
                p={2}
                sx={{
                  display: "inline-list-item",
                  flexWrap: "wrap",
                  justifyContent: "start",
                  alignContent: "center",
                }}
                gap={5}
                flexWrap="wrap"
              >
                {/* {(<></>)} */}
                {products.length === 0 && search ? (
                  <Stack
                    // display="flex"
                    justifyContent="center"
                    marginX={"100px"}
                    alignItems={"center"}
                    minHeight={300}
                    sx={{ marginY: 2 }}
                  >
                    <Typography level="h4">No products found</Typography>
                  </Stack>
                ) : (
                  (products.length === 0 ? product : products)
                    ?.slice(start, end)
                    ?.map((product) => {
                      return (
                        <Stack
                          direction="row"
                          justifyContent={"flex"}
                          alignItems={"center"}
                          flexWrap="wrap"
                          key={product._id}
                          onClick={() => {
                            handleOpen(product.slug);
                          }}
                        >
                          <Card
                            sx={{
                              minWidth: 220,
                              maxWidth: 220,
                              boxShadow: "lg",
                            }}
                            onClick={() => {
                              handleOpen(product.slug);
                            }}
                          >
                            <CardOverflow>
                              <AspectRatio sx={{ minWidth: 220 }}>
                                <img
                                  src={`${url}/product/getphotoproduct/${product._id}`}
                                  loading="lazy"
                                  alt=""
                                />
                              </AspectRatio>
                            </CardOverflow>
                            <CardContent onClick={handleOpenModal}>
                              <Typography level="body-xs">
                                {product.category.name}
                              </Typography>
                              <Link
                                href="#product-card"
                                fontWeight="md"
                                color="neutral"
                                textColor="text.primary"
                                overlay
                                // endDecorator={<ArrowOutwardIcon />}
                              >
                                {product.name}
                              </Link>

                              <Typography
                                level="title-lg"
                                sx={{ mt: 1, fontWeight: "xl" }}
                                endDecorator={
                                  <Chip
                                    component="span"
                                    size="sm"
                                    variant="soft"
                                    color="success"
                                  >
                                    Lowest price
                                  </Chip>
                                }
                              >
                                {product.price} PKR
                              </Typography>
                              <Typography level="body-sm">
                                (Only <b>7</b> left in stock!)
                              </Typography>
                            </CardContent>

                            <CardOverflow>
                              <Button
                                variant="solid"
                                sx={{ backgroundColor: "#1D1F1D" }}
                                size="lg"
                              >
                                Add to cart
                              </Button>
                            </CardOverflow>
                          </Card>
                        </Stack>
                      );
                    })
                )}
              </Box>
            )}
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems={"center"}
              sx={{ marginY: 2 }}
            >
              {product.length === 0 || products.length === 0 || search ? (
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
export default Home;
