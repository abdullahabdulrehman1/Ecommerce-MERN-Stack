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
import CircularProgress from "@mui/material/CircularProgress";
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
import clsx from "clsx";
import PropTypes from "prop-types";
import { CartContext } from "../../context/cartContex";
import { useContext } from "react";
import Modal from "@mui/material/Modal";
import { motion, AnimatePresence } from "framer-motion";
import { grey } from "@mui/material/colors";
// import { useCartContext } from "../../context/cartContex.jsx";

export const Home = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => setOpen(true);
  const [popLayout, setPopLayout] = useState(false);
  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

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
  const { cartItems, addToCart } = useContext(CartContext);

  // const { cart, setCart, addToCart } = useCartContext();
  const variants = {
    initial: { perspective: 0 },
    animate: { perspective: 1000 },
  };
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
  // console.log(addCart);
  Backdrop.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
  };
  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
    toast.success(`${product.name} removed from cart!`);
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
              availablequantity: product.quantity,
              price: product.price,
              salequantity: product.salequantity,
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

  // console.log(checked);
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
              availablequantity: product.quantity,
              price: product.price,
              slug: product.slug,
              salequantity: product.salequantity,
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
    if (!radio.length && !checked.length) getAllProducts();
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
              availablequantity: product.quantity,
              price: product.price,
              slug: product.slug,
              salequantity: product.salequantity,
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
    // bgcolor: "background.paper",
    border: "2px solid #000",
    // boxShadow: 0,
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
        setSingleProduct({
          _id: data.singleProduct._id,
          name: data.singleProduct.name,
          description: data.singleProduct.description,
          availablequantity: data.singleProduct.quantity,
          price: data.singleProduct.price,
          salequantity: data.singleProduct.salequantity,
          slug: data.singleProduct.slug,
          category: data.singleProduct.category,
        })
      );
    } catch (error) {
      setLoading(false);
      // setError("Error fetching products");
      console.log("getSingleProduct function error: " + error);
    }
  };

  const [relatedProducts, SetRelatedProducts] = useState([]);
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        if (singleProduct && singleProduct.category) {
          const response = await axios.get(
            `${url}/product/similarproduct/${singleProduct._id}/${singleProduct.category._id}`
          );
          const data = response.data;
          SetRelatedProducts(
            data.similarProducts.map((product) => {
              return {
                _id: product._id,
                name: product.name,
                description: product.description,
                availablequantity: product.quantity,
                price: product.price,
                slug: product.slug,
                salequantity: product.salequantity,
                category: product.category,
              };
            })
          );
        } else {
          SetRelatedProducts([]);
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };
    fetchRelatedProducts();
  }, [singleProduct]);

  // console.log(addCart);
  // console.log(relatedProducts);
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
            // sx={{
            //   backdropFilter: "blur(10px)",
            //   backgroundColor: "rgba(255, 255, 255, 0.5)",
            // }}
          >
            {loading ? (
              <CircularProgress />
            ) : (
              <Box
                sx={{
                  ...style,
                  width: "80%",
                  height: "80%",
                  // backdropFilter: "blur(2px)",
                  overflow: "auto",
                  margin: 2,
                  padding: 4,

                  backgroundColor: "rgba(257, 255, 260, 1)",
                }}
              >
                {singleProduct && (
                  <div>
                    <Typography
                      level="h2"
                      fontWeight="thin"
                      sx={{ mt: 2, ml: 4 }}
                    >
                      Product Details
                    </Typography>
                    <Stack
                      alignItems={"center"}
                      justifyContent={"center"}
                      direction={{ md: "row", xs: "column" }}
                      flexWrap={"wrap"}
                    >
                      <Box
                        display={{ lg: "flex", md: "flex" }}
                        justifyContent={{ xs: "center", sm: "center" }}
                        alignItems={{ xs: "center", sm: "center" }}
                        flexWrap="wrap"
                        gap={5}
                        mt="20px"
                        sx={{
                          flexDirection: "column",
                          "@media (min-width: 500px)": {
                            flexDirection: "row",
                          },
                        }}
                      >
                        <AspectRatio
                          sx={{
                            minWidth: "100%",
                            maxWidth: "100%",
                            borderRadius: "30px",
                            "@media (min-width: 600px)": {
                              minWidth: "600px",
                              maxWidth: "600px",
                            },
                          }}
                        >
                          <img
                            width="100%"
                            height="100%"
                            src={`${url}/product/getphotoproduct/${singleProduct._id}`}
                            loading="lazy"
                            alt=""
                          />
                        </AspectRatio>
                        <Stack
                          sx={{
                            minWidth: "100%",
                            maxWidth: "100%",
                            borderRadius: "30px",
                          }}
                          // display="flex"
                          justifyContent="start"
                          alignItems={"start"}
                        >
                          {/* Product details */}

                          <Typography
                            level="h2"
                            fontWeight="thin"
                            sx={{ mt: 2, ml: 4, textDecoration: "underline" }}
                          >
                            {singleProduct.name}
                          </Typography>
                          <Typography
                            level="body1"
                            fontWeight="thin"
                            sx={{ mt: 2, ml: 4 }}
                          >
                            {singleProduct.description}
                          </Typography>
                          <Typography
                            level="body1"
                            fontWeight="bold"
                            sx={{ mt: 2, ml: 4 }}
                          >
                            Price: {singleProduct.price}PKR
                          </Typography>
                          {/* {  !cartItems.find(item => item.id === product.id) ? ():} */}
                          <Button
                            variant="solid"
                            style={{
                              backgroundColor: "#212121", // This is equivalent to grey[900] in Material-UI
                              color: "white",
                            }}
                            sx={{ mt: 2, ml: 4 }}
                            onClick={() => {
                              addToCart(singleProduct);
                              toast.success("Product added to cart");
                            }}
                          >
                            Add to Cart
                          </Button>
                        </Stack>
                      </Box>
                      {/* </Box> */}
                      <Box gap={5}>
                        <Typography
                          level="h2"
                          fontWeight="thin"
                          sx={{ mt: 2, ml: 4 }}
                        >
                          Related Products
                        </Typography>
                        {relatedProducts.length === 0 ? (
                          <Typography
                            level="body1"
                            fontWeight="thin"
                            sx={{ mt: 2, ml: 4 }}
                          >
                            No products found.
                          </Typography>
                        ) : (
                          relatedProducts?.map((product) => {
                            return (
                              <Stack
                                direction="column"
                                justifyContent={"center"}
                                alignItems={"center"}
                                flexWrap="wrap"
                                key={product._id}
                                gap={5}
                                sx={{ margin: 2 }}
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
                                      (
                                      <b>
                                        {product.availablequantity > 1000
                                          ? `${(
                                              product.availablequantity / 1000
                                            ).toFixed(0)}k`
                                          : product.availablequantity}
                                      </b>{" "}
                                      left in stock!)
                                    </Typography>
                                  </CardContent>

                                  <CardOverflow
                                    onClick={() => {
                                      addToCart(product);
                                      toast.success("Product added to cart");
                                    }}
                                  >
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
                    </Stack>
                  </div>
                )}
              </Box>
            )}
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
              color="grey"
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
                              sx={{
                                color: grey[800],
                                "&.Mui-checked": {
                                  color: grey[900],
                                },
                              }}
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
                sx={{
                  color: grey[800],
                  "&.Mui-checked": {
                    color: grey[600],
                  },
                }}
                name="radio-buttons-group"
                color="grey"
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
                          control={
                            <Radio
                              sx={{
                                color: grey[800],
                                "&.Mui-checked": {
                                  color: grey[900],
                                },
                              }}
                            />
                          }
                          color="grey"
                          label={price.name}
                        />
                      </Collapse>
                    </Box>
                  );
                })}
              </RadioGroup>
            </Box>
            <Button
              sx={{ mt: 2, ml: 2, backgroundColor: grey[900] }}
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
                  justifyContent: {
                    xs: "center",
                    sm: "start",
                    md: "start",
                    lg: "start",
                  },
                  alignContent: "center",
                }}
                flexGrow={1}
                gap={5}
                flexWrap="wrap"
              >
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
                  <AnimatePresence mode={popLayout ? "popLayout" : "sync"}>
                    {(products.length !== 0 ? products : product)
                      ?.slice(start, end)
                      ?.map((product) => {
                        return (
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            layout
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{
                              scale: 1,
                              opacity: 1,
                            }}
                            variants={variants}
                            exit={{ scale: 0.7, opacity: 0 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            key={product._id}
                          >
                            <Stack
                              direction="row"
                              justifyContent={"flex"}
                              alignItems={"center"}
                              flexWrap="wrap"
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
                                    (
                                    <b>
                                      {product.availablequantity > 1000
                                        ? `${(
                                            product.availablequantity / 1000
                                          ).toFixed(0)}k`
                                        : product.availablequantity}
                                    </b>{" "}
                                    left in stock!)
                                  </Typography>
                                </CardContent>

                                <CardOverflow
                                  onClick={() => {
                                    addToCart(product);
                                    toast.success("Product added to cart");
                                  }}
                                >
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
                          </motion.div>
                        );
                      })}
                  </AnimatePresence>
                )}
              </Box>
            )}
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems={"center"}
              sx={{ marginY: 2 }}
            >
              {product.length === 0 && products.length === 0 && search ? (
                <></>
              ) : (
                <Pagination
                  count={Math.ceil(product.length / itemperpage)}
                  page={page}
                  onChange={handleChange}
                  color="grey"
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
