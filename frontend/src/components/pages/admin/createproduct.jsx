import React from "react";
import Layout from "../../layout/layout.jsx";
import AdminMenu from "../../layout/adminmenu.jsx";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { CancelOutlined, UploadFileOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
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

  return (
    <Layout title={"Ecommerce | Create-Product"}>
      <div className="container border border-black mx-auto rounded-lg">
        <div className="row grid grid-cols-12 row-span-2 justify-between">
          <div className="col-span-3 row-span-1 border ">
            <AdminMenu />
          </div>
          <div className="md:col-span-9 sm:col-span-12  px-10 pt-2 ">
            <Typography variant="h5" color="initial">
              Create Product{" "}
            </Typography>
            <Divider sx={{ marginY: "10px" }} />
            <Box className="mx-10 my-5 ">
              <FormControl sx={{ width: "100%" }}>
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
                      <MenuItem value={category.id} key={category.id}>
                        {category.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                <form action={<Link to="/login" />}>
                  <Stack
                    spacing={6}
                    direction="row"
                    sx={{ marginY: 4 }}
                    alignItems={"center"}
                  >
                    <TextField
                      type="text"
                      variant="outlined"
                      color="secondary"
                      label="Product Name"
                      onChange={(e) => setName(e.target.value)}
                      // value={name}
                      fullWidth
                      required
                    />
                    <FormLabel>Shipping</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                      sx={{ my: 2 }}
                    >
                      <Stack direction="horizontal" gap={1}>
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="No"
                        />
                      </Stack>
                    </RadioGroup>
                  </Stack>
                  <TextField
                    type="text"
                    variant="outlined"
                    color="secondary"
                    label="Product Description"
                    multiline
                    rows={2}
                    // marginY={'20px'}
                    // onChange={e => setLastName(e.target.value)}
                    // value={lastName}
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                  />

                  <TextField
                    type="email"
                    variant="outlined"
                    color="secondary"
                    label="Email"
                    // onChange={e => setEmail(e.target.value)}
                    // value={email}

                    fullWidth
                    required
                    sx={{ mb: 4 }}
                  />
                  <TextField
                    type="password"
                    variant="outlined"
                    color="secondary"
                    label="Password"
                    // onChange={e => setPassword(e.target.value)}
                    // value={password}
                    required
                    fullWidth
                    sx={{ mb: 4 }}
                  />

                  <Button variant="outlined" color="secondary" type="submit">
                    Register
                  </Button>
                </form>
              </FormControl>
            </Box>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
