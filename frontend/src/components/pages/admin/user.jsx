import React, { useEffect, useState } from "react";
import Layout from "../../layout/layout.jsx";
import AdminMenu from "../../layout/adminmenu.jsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import url from "../../../utils/exporturl.jsx";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
const User = () => {
  const [clickedRow, setClickedRow] = React.useState();
  const onButtonClick = (e, row) => {
    e.stopPropagation();
    setClickedRow(row);
  };

  const [disable, setdisable] = useState(null);
  const columns = [
    { field: "id", headerName: "ID", width: 260 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      editable: true,
      copy: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      width: 120,
      editable: true,
    },
    {
      field: "delete",
      headerName: "Delete",
      description: "Actions column.",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        console.log(params);
        return (
          <Button
            onClick={(e) => {
              onButtonClick(e, params.row);
              deleteUser(params.row.id);
              setdisable(params.row.id);
            }}
            disabled={params.row.role === "1" || params.row.id === disable}
            variant="contained"
          >
            Delete
          </Button>
        );
      },
    },
  ];
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const displayAllUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/auth/all-users`);
      const data = response.data;
      setLoading(false);

      return (
        setLoading(false),
        setRows(
          data.users.map((users) => {
            return {
              id: users._id,
              name: users.name,
              email: users.email,
              role: users.role,
            };
          })
        )
      );
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.delete(`${url}/auth/delete-user/${id}`, {});
      if (response.data.success) {
        displayAllUsers();
        console.log("User deleted");
        toast.success("User Deleted");
      } else {
        displayAllUsers();
        console.log(response.data.message); // Log the error message from the server
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("deleteCategory function error: " + error);
    }
  };
  useEffect(() => {
    setLoading(true);
    displayAllUsers();
  }, []);

  return (
    <Layout title={"Dashboard | All Users"}>
      <Container fixed maxWidth="false" sx={{ border: "3px solid black" }}>
      <Stack direction="row" spacing={2}>
        <Box sx={{ flexGrow: 1, flexBasis: '25%' }}>
          <AdminMenu />
        </Box>
        <Box sx={{ flexGrow: 3, flexBasis: '75%', p: 2 }}>
       <Typography variant="h5" color="initial">
              All Users{" "}
            </Typography>
            <Divider sx={{ marginY: "10px" }} />
            {loading === true ? (
              <CircularProgress
                sx={{ position: "absolute", top: "40%", left: "60%" }}
                color="success"
              />
            ) : (
              <Box sx={{ height: "full", width: "full" }}>
                <DataGrid
                  isLoaded={true}
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10,
                      },
                    },
                  }}
                  pageSizeOptions={[5, 10, 20]}
                  // checkboxSelection
                  // disableRowSelectionOnClick
                />
              </Box>
            )}
            clickedRow: {clickedRow ? `${clickedRow.email}` : null}
            </Box>
      </Stack>
    </Container>
    </Layout>
  );
};

export default User;
