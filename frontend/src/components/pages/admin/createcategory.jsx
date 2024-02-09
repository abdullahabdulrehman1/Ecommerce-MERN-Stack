import React, { useState } from "react";
import Layout from "../../layout/layout.jsx";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import AdminMenu from "../../layout/adminmenu.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import url from "../../../utils/exporturl.jsx";
import Typography from "@mui/material/Typography";
const CreateCategory = () => {
  const [category, setCategory] = useState("");
  const handleCategory = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;

      const response = await axios.post(`${url}/category/create-category`, {
        name: category,
      });

      if (response.data.success) {
        console.log("Category created");
        toast.success("Category Created");
        setCategory("");
      } else {
        console.log(response.data.message); // Log the error message from the server
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("handleCategory function error: " + error);
      setCategory("");
    }
  };
  //  console.log(category)
  return (
    <Layout title={"Ecommerce | Create-Category"}>
      <div className="container border border-black mx-auto rounded-lg">
        <div className="row grid grid-cols-12 row-span-2 justify-between">
          <div className="col-span-3 row-span-1 border ">
            <AdminMenu />
          </div>
          <div className="col-span-9  px-10 py-2 ">
            <Typography variant="h5" color="initial">
              Create Categories{" "}
            </Typography>
            <Box sx={{ height: "full", width: "full" }}>
              <Stack
                spacing={5}
                direction="row"
                marginY={3}
                justifyContent="start"
              >
                <TextField
                  required
                  id="outlined-basic"
                  style={{ width: "50%" }}
                  label="Create a new Category"
                  onChange={(e) => setCategory(e.target.value)}
                  variant="outlined"
                  value={category}
                />
                <Button
                  variant="outlined"
                  style={{ width: "20%" }}
                  onClick={handleCategory}
                  color="primary"
                >
                  Create
                </Button>
              </Stack>
              <Divider />
              <Box>
                <Stack marginY={2}>
                  <Typography variant="h5" color="initial">
                    All Categories{" "}
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
