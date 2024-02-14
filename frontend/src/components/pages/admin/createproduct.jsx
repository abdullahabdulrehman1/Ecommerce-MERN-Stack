import React from "react";
import Box from "@mui/material/Box";
import Layout from "../../layout/layout.jsx";
import AdminMenu from "../../layout/adminmenu.jsx";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import axios from "axios";
import url from "../../../utils/exporturl.jsx";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { toast } from "react-toastify";
import InputAdornment from "@mui/material/InputAdornment";
import { CancelRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState("");
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const handleChange = (event) => {};
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
      const response = await axios.post(
        `${url}/product/create-product`,
        formData
      );
      setLoading(false);
      toast.success(response.data.message);
      // navigate('/dashboard')
      if (response.status === 201) {
        setName("");
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
  // console.log(shipping)
  return (
    <Layout title={"Ecommerce | Create-Category"}>
      <div className="container border border-black mx-auto rounded-lg">
        <div className="row grid grid-cols-12 row-span-auto justify-between">
          <div className="lg:col-span-3 md:col-span-3 col-span-12 row-span-1 border ">
            <AdminMenu />
          </div>
          <div className="lg:col-span-9 md:col-span-9 flex-col  ml-10  flex-wrap  col-span-12 sm:px-2    md:px-5 lg:px-10 pt-2 ">
            <Typography variant="h5" color="initial">
              Create Product{" "}
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
                  m: 4,
                  justifyContent: "center",
                }}
              >
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {rows.map((category) => {
                    return (
                      <MenuItem value={category.name} key={category.name}>
                        {category.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                <form>
                  <Stack
                    direction={{ lg: "row", md: "column", sm: "column" }}
                    alignItems={{ lg: "center", md: "start", sm: "start" }}
                    justifyContent={{ md: "start", sm: "center" }}
                    sx={{ my: 4 }}
                    gap={4}
                  >
                    <TextField
                      type="text"
                      variant="outlined"
                      color="secondary"
                      label="Product Name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      // sx={{ my: 0 }}
                      fullWidth
                      required
                    />
                    <Stack
                      direction="row"
                      alignItems={{ lg: "center", md: "center", sm: "center" }}
                      justifyContent={{ md: "start", sm: "start" }}
                      gap={1}
                    >
                      <FormLabel>Shipping</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="true"
                        name="radio-buttons-group"
                        value={shipping}
                        sx={{ my: 0 }}
                        onChange={(e) => setShipping(e.target.value)}
                        // onClick={}
                      >
                        <Stack
                          direction="row"
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
                            border: { sm: "1px solid black ", xs: "none" },
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
                            border: { sm: "1px solid black ", xs: "none" },
                            borderRadius: { sm: "20px", xs: "none" },
                          }}
                          textOverflow={"clip"}
                          display={"inline"}
                        >
                          Upload Photo
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
                    ) : null}
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
                          <InputAdornment position="start">$</InputAdornment>
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
                          <InputAdornment position="start">kg</InputAdornment>
                        ),
                      }}
                      value={quantity}
                      variant="outlined"
                      type="number"
                    />
                  </Stack>

                  <Button
                    variant="outlined"
                    color="secondary"
                    type="submit"
                    onClick={handleSubmit}
                    sx={{ mb: 2 }}
                  >
                    Submit
                  </Button>
                </form>
              </FormControl>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
