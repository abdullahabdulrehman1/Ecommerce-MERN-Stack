import React, { useEffect, useState } from "react";
import Layout from "../../layout/layout.jsx";
import AdminMenu from "../../layout/adminmenu.jsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import url from "../../../utils/exporturl.jsx";
import { copy } from "superagent";
const User = () => {
  const [clickedRow, setClickedRow] = React.useState();
  const onButtonClick = (e, row) => {
    e.stopPropagation();
    setClickedRow(row);
  };

  // displayAllUsers();
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
        return (
          <Button
            onClick={(e) => onButtonClick(e, params.row)}
            variant="contained"
          >
            Delete
          </Button>
        );
      },
    },
  ];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const displayAllUsers = async () => {
      try {
        const response = await axios.get(`${url}/auth/all-users`);
        const data = response.data;
        return setRows(
          data.users.map((users) => {
            return {
              id: users._id,
              name: users.name,
              email: users.email,
              role: users.role,
            };
          })
        );
      } catch (error) {
        console.log(error);
      }
    };

    displayAllUsers();
  }, []);

  return (
    <Layout title={"Dashboard | All Users"}>
      <div className="container border border-black mx-auto rounded-lg">
        <div className="row grid grid-cols-12 row-span-2 justify-between">
          <div className="col-span-3 row-span-1 border ">
            <AdminMenu />
          </div>
          <div className="col-span-9  px-10 py-1">
            <h1>ALL Users</h1>
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
            clickedRow: {clickedRow ? `${clickedRow.email}` : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default User;
