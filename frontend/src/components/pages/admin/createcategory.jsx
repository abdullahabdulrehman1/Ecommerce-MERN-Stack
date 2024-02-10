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
import { Delete } from "@mui/icons-material";
import { data } from "autoprefixer";

const CreateCategory = () => {
  const [rows, setRows] = useState([]);
  // const [editStart, setEditStart] = useState(false)
  const [category, setCategory] = useState("");

  const handleCellChangeCommitted = (params) => {
    console.log("Edited Name:", params.props.value);
  };
  const getAllCategories = async () => {
    // event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get(`${url}/category/getcategory`);

      return setRows(
        response.data.allCategory.map((category) => {
          return {
            id: category._id,
            name: category.name,
          };
        })
      );
    } catch (error) {
      console.log("getAllCategories function error: " + error);
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  console.log(rows);
  // console.log(getAllCategories)

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
    // console.log(params)
    // const { id, name } = params;
    const updated = { ...params, isNew: false };
    console.log(params);
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
          console.log(response.data.message); // Log the error message from the server
          toast.error(response.data.message);
        }
      } else {
        // console.log(response.data.   message); // Log the error message from the server
        toast.error("Same Value");
      }
    } catch (error) {
      console.log("editCategory function error: " + error);
    }
  };
  const [edit, setEdit] = useState("");

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
              onButtonClick(e, params.row);
              deleteCategory(params.row.id);
            }}
            variant="contained"
          >
            Delete
          </Button>
        );
      },
    },
    {
      field: "Edit",
      headerName: "Edit",
      description: "Actions column.",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <Button
            onClick={(e) => {
              onButtonClick(e, params.row);

              editCategory();
            }}
            variant="contained"
          >
            EDIT
          </Button>
        );
      },
    },
  ];
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    console.log(updatedRow);
    //handle send data to api
    return updatedRow;
  };
  //  console.log(category)
  return (
    <Layout title={"Ecommerce | Create-Category"}>
      <div className="container border border-black mx-auto rounded-lg">
        <div className="row grid grid-cols-12 row-span-2 justify-between">
          <div className="col-span-3 row-span-1 border ">
            <AdminMenu />
          </div>
          <div className="md:col-span-9 sm:col-span-12 px-10 py-2 ">
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
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
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
                />
              </Box>
              {/* clickedRow: {clickedRow ? `${clickedRow.name} ${edit}` : null} */}
            </Box>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
