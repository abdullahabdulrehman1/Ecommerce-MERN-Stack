import React, { useState, useEffect } from "react";
import Layout from "../../layout/layout.jsx";
import AdminMenu from "../../layout/adminmenu.jsx";
import axios from "axios";
import url from "../../../utils/exporturl.jsx";
import { styled, css } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  InputAdornment,
  FormLabel,
  CircularProgress,
  Typography,
  Divider,
  Box,
  Button,
  Card,
  Pagination,
  CardContent,
  Container,
  CardMedia,
  CardActionArea,
  CardActions,
} from "@mui/material";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Modal as BaseModal } from "@mui/base/Modal";
import { get } from "superagent";
import { CancelRounded } from "@mui/icons-material";

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

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);

const AllProducts = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [singleProduct, setSingleProduct] = useState([{}]);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState("");
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const getAllCategories = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get(`${url}/category/getcategory`);
      setLoading(false);

      return (
        setLoading(false),
        setRows(
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
  useEffect(() => {
    setLoading(true);
    getAllCategories();
    // setLoading
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("shipping", shipping);
      formData.append("photo", photo);
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.put(
        `${url}/product/updateproduct/${singleProduct.id}`,
        formData
      );
      setLoading(false);
      toast.success(response.data.message);
      // navigate('/dashboard')
      if (response.status === 201) {
        setName();
        setDescription("");
        setPrice("");
        setCategory("");
        setQuantity("");
        setShipping("");
        setPhoto("");
      }
    } catch (error) {
      setLoading(false);
      toast.error("product:" + error.response.data.message);
      console.log("handleSubmit function error: " + error);
    }
  };

  const handleOpen = (slug) => {
    setOpen(true);
    getSingleProduct(slug);
    console.log("Clicked product ID:", slug);
  };
  const handleClose = () => setOpen(false);
  const [page, setPage] = useState(1);
  const itemperpage = 10;
  const start = (page - 1) * itemperpage;
  const end = start + itemperpage;

  const handleChange = (event, value) => {
    setPage(value);
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
  useEffect(() => {
    setLoading(true);
    getSingleProduct();
  }, []);
  useEffect(() => {
    if (singleProduct) {
      setPrice(singleProduct.price);
      setDescription(singleProduct.description);
      setName(singleProduct.name || "");
      // setCategory(categoryName);
      setQuantity(singleProduct.quantity);
      setPhoto(singleProduct.photo);
      setShipping(singleProduct.shipping === "true" ? "true" : "false"); // Conditionally set shipping based on its truthiness
    }
  }, [singleProduct]);

  const getAllProducts = async () => {
    // Rest of the code

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
              slug: product.slug,
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
  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.delete(
        `${url}/product/deleteproduct/${singleProduct.slug}`
      );
      setLoading(false);
      toast.success(response.data.message);
      if (response.status === 201) {
        setName();
        setDescription("");
        setPrice("");
        setCategory("");
        setQuantity("");
        setShipping("");
        setPhoto("");
        setOpen(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("product:" + error.response.data.message);
      console.log("handleDelete function error: " + error);
    }
  };
  return (
    <Layout title={"Ecommerce | Create-Category"}>
      <div className="container border border-black mx-auto rounded-lg">
        <div>
          <Modal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            onClose={handleClose}
            slots={{ backdrop: StyledBackdrop }}

            // disableScrollLock={false}
          >
            <ModalContent
              sx={{ width: "80%", height: "80%", overflow: "scroll" }}
            >
              <div className="container border border-black mx-auto rounded-lg">
                <div className="row  mx-2">
                  {/* <div className="lg:col-span-0 md:col-span-3 col-span-12 row-span-1 border "> */}
                  {/* <AdminMenu /> */}
                  {/* </div> */}
                  <div className=" flex-col  md:mx-2  flex-wrap  col-span-12 sm:px-2    md:px-5 lg:px-10  pt-2 ">
                    <Typography variant="h5" color="initial">
                      Update Product{" "}
                    </Typography>
                    <Divider sx={{ marginY: "10px" }} />
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
                      <FormControl
                        sx={{
                          width: "full",
                          display: "flex",
                          m: { md: 4, sm: 0, xs: 0 },
                          justifyContent: "center",
                        }}
                      >
                        <InputLabel id="demo-simple-select-label">
                          Category
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={category}
                          label="Category"
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          {rows.map((category) => {
                            return (
                              <MenuItem
                                value={category.name}
                                key={category.name}
                              >
                                {category.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        <form action="#">
                          <Stack
                            direction={{
                              lg: "row",
                              md: "column",
                              sm: "column",
                            }}
                            alignItems={{
                              lg: "center",
                              md: "start",
                              sm: "start",
                            }}
                            justifyContent={{ md: "start", sm: "center" }}
                            sx={{ my: 4 }}
                            gap={4}
                            paddingX={0}
                          >
                            <TextField
                              type="text"
                              variant="outlined"
                              color="secondary"
                              label="Product Name"
                              onChange={(e) => setName(e.target.value)}
                              value={name}
                              fullWidth
                              required
                            />
                            <Stack
                              direction={{
                                md: "row",
                                sm: "column",
                                xs: "column",
                              }}
                              alignItems={{
                                lg: "center",
                                md: "center",
                                sm: "start",
                                xs: "start",
                              }}
                              justifyContent={{
                                md: "start",
                                sm: "start",
                                xs: "start",
                              }}
                              gap={1}
                            >
                              <FormLabel>Shipping</FormLabel>
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                value={shipping}
                                sx={{ my: 0 }}
                                onChange={(e) => setShipping(e.target.value)}
                              >
                                <Stack
                                  direction={{
                                    md: "row",
                                    sm: "column",
                                    xs: "column",
                                  }}
                                  alignItems={{
                                    lg: "center",
                                    md: "start",
                                    sm: "start",
                                  }}
                                  justifyContent={{ md: "start", sm: "center" }}
                                  gap={1}
                                >
                                  <FormControlLabel
                                    value="true"
                                    control={<Radio />}
                                    label="Yes"
                                  />
                                  <FormControlLabel
                                    value="false"
                                    control={<Radio />}
                                    label="No"
                                  />
                                </Stack>
                              </RadioGroup>
                            </Stack>
                          </Stack>
                          <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Product Description"
                            multiline
                            onChange={(e) => setDescription(e.target.value)}
                            rows={2}
                            value={description}
                            fullWidth
                            required
                            sx={{ mb: 4 }}
                          />
                          <div className="mb-8">
                            <label className=" p-2 rounded-lg ">
                              {photo ? (
                                <Typography
                                  variant="body2"
                                  sx={{
                                    p: { sm: 2, xs: 0 },
                                    border: {
                                      sm: "1px solid black ",
                                      xs: "none",
                                    },
                                    borderRadius: { sm: "20px", xs: "none" },
                                  }}
                                  textOverflow={"clip"}
                                  display={"inline"}
                                >
                                  {photo.name}{" "}
                                </Typography>
                              ) : (
                                <Typography
                                  variant="body2"
                                  sx={{
                                    p: { sm: 2, xs: 0 },
                                    border: {
                                      sm: "1px solid black ",
                                      xs: "none",
                                    },
                                    borderRadius: { sm: "20px", xs: "none" },
                                    cursor: "pointer",
                                  }}
                                  textOverflow={"clip"}
                                  display={"inline"}
                                >
                                  Upload New Photo
                                </Typography>
                              )}
                              <input
                                type="file"
                                onChange={(e) => setPhoto(e.target.files[0])}
                                hidden
                                accept="image/*"
                                name="photo"
                                style={{ display: "none" }}
                              />
                            </label>

                            {photo ? (
                              <div className="inline">
                                {" "}
                                <CancelRounded
                                  sx={{ boxShadow: {} }}
                                  onClick={() => setPhoto("")}
                                />
                                <img
                                  src={URL.createObjectURL(photo)}
                                  // className="margin-top-4 first-letter:"
                                  className="mt-5 hidden md:block max-w-[450px] max-h-[300px]"
                                  alt="product"
                                />
                              </div>
                            ) : (
                              <div>
                                <img
                                  src={`${url}/product/getphotoproduct/${singleProduct.id}`}
                                  className="mt-5 hidden md:block max-w-[450px] max-h-[300px]"
                                  alt="product"
                                />
                              </div>
                            )}
                          </div>
                          <Stack
                            direction={{ md: "row", sm: "column" }}
                            alignItems={{ md: "center", sm: "start" }}
                            gap={4}
                          >
                            <TextField
                              label="Product Price"
                              sx={{
                                mb: 4,
                                md: { width: "50%" },
                                sm: { width: "100%" },
                              }}
                              onChange={(e) => setPrice(e.target.value)}
                              value={price}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    $
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              type="number"
                            />

                            <TextField
                              label="Quantity"
                              sx={{
                                mb: 4,
                                md: { width: "50%" },
                                sm: { width: "100%" },
                              }}
                              onChange={(e) => setQuantity(e.target.value)}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    kg
                                  </InputAdornment>
                                ),
                              }}
                              value={quantity}
                              variant="outlined"
                              type="number"
                            />
                          </Stack>

                          <Stack
                            direction={{
                              md: "row",
                              sm: "column",
                              xs: "column",
                            }}
                            justifyContent={"space-between"}
                            alignItems={{ md: "center", xs: "start" }}
                          >
                            <Button
                              variant="contained"
                              color="success"
                              type="submit"
                              onClick={handleSubmit}
                              sx={{ mb: 2 }}
                            >
                              Update
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              type="submit"
                              onClick={handleDelete}
                              sx={{ mb: 2 }}
                            >
                              Delete
                            </Button>
                          </Stack>
                        </form>
                      </FormControl>
                    )}
                  </div>
                </div>
              </div>
            </ModalContent>
          </Modal>
        </div>

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
                      onClick={() => {
                        handleOpen(product.slug);
                      }}
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
