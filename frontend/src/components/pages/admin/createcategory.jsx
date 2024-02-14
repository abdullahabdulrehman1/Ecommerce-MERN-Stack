import React, { useEffect, useState } from "react";
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
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const CreateCategory = () => {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [category, setCategory] = useState("");

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

  console.log(rows);

  const handleCategory = async (event) => {
    event.preventDefault();
    if (category === "") return toast.error("Category cannot be empty");
    const regex = /^[a-zA-Z _-]+$/i;
    if (!regex.test(category))
      return toast.error("Category cannot contain special characters");

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
        getAllCategories();
      } else {
        console.log(response.data.message); // Log the error message from the server
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("handleCategory function error: " + error);
      setCategory("");
    }
  };
  const [clickedRow, setClickedRow] = React.useState();
  const onButtonClick = (e, row) => {
    e.stopPropagation();

    setClickedRow(row);
  };
  const deleteCategory = async (id) => {
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.delete(
        `${url}/category/deletecategory/${id}`
      );
      if (response.data.success) {
        console.log("Category deleted");
        toast.success("Category Deleted");
        getAllCategories();
      } else {
        console.log(response.data.message); // Log the error message from the server
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("deleteCategory function error: " + error);
    }
  };
  const editCategory = async (params) => {
    const regex = /^[a-z]+$/i;
    if (!regex.test(params.name))
      return toast.error("Category cannot contain special characters");

    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      if (params !== undefined) {
        const response = await axios.put(`${url}/category/update-category`, {
          id: params.id,
          name: params.name,
        });

        if (response.data.success) {
          console.log("Category updated");
          toast.success("Category Updated");
          getAllCategories();
        } else {
          console.log(response.data.message);
          toast.error(response.data.message);
        }
      } else {
        toast.error("Same Value");
      }
    } catch (error) {
      console.log("editCategory function error: " + error);
    }
  };
  const [edit, setEdit] = useState("");
  const [disable, setdisable] = useState(null);
  const columns = [
    {
      field: "name",
      headerName: "Category Name",
      width: 500,
      editable: true,
    },
    {
      field: "delete",
      headerName: "Delete",
      description: "Actions column.",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <Button
            onClick={(e) => {
              setdisable(params.row.id);
              onButtonClick(e, params.row);
              deleteCategory(params.row.id);
            }}
            disabled={disable === params.row.id}
            variant="contained"
          >
            Delete
          </Button>
        );
      },
    },
  ];
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    console.log(updatedRow);
    return updatedRow;
  };
  return (
    <Layout title={"Ecommerce | Create-Category"}>
      <div className="container border border-black mx-auto rounded-lg">
        <div className="row grid grid-cols-12 row-span-2 justify-between">
          <div className="lg:col-span-3 md:col-span-12 sm:col-span-12 xs:col-span-12 col-span-12 row-span-1 border ">
            <AdminMenu />
          </div>
          <div className="lg:col-span-9 md:col-span-9 flex-col ml-10 flex-wrap  col-span-12 sm:px-2    md:px-5 lg:px-10 pt-2 ">
            {" "}
            <Typography variant="h5" color="initial">
              Create Categories{" "}
            </Typography>
            <Divider sx={{ marginY: "10px" }} />
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
              {loading === true ? (
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
                <Box>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    rowsPerPageOptions={[5]}
                    processRowUpdate={editCategory}
                    onProcessRowUpdateError={() => console.log("error")}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 10,
                        },
                      },
                    }}
                    pageSizeOptions={[5, 10, 20]}
                  />
                </Box>
              )}
            </Box>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
