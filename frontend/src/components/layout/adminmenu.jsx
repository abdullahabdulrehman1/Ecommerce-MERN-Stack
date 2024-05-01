import { NavLink } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
const AdminMenu = () => {
  return (
    <div className="">
      <Box>
        <nav aria-label="main mailbox folders" style={{ border: "none" }}>
          <List>
            <ListItemText
              primary="Admin Panel"
              primaryTypographyProps={{
                fontSize: 40,
                fontWeight: "medium",
                letterSpacing: 0,
                fontFamily: "Roboto",
                fontStyle: "bold",
              }}
              sx={{ textAlign: "center" }}
            />
            <NavLink to="/dashboard/admin/create-category">
              <ListItem>
                <ListItemButton>
                  <ListItemText
                    primary="Create Category"
                    secondary="Create New Category"
                    sx={{ textAlign: "center" }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <Divider />
            <NavLink to="/dashboard/admin/create-product">
              <ListItem>
                <ListItemButton>
                  <ListItemText
                    primary="Create Product"
                    secondary="Add New Products"
                    sx={{ textAlign: "center" }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <Divider />
            <NavLink to="/dashboard/admin/allusers">
              <ListItem>
                <ListItemButton>
                  <ListItemText
                    primary="All Users"
                    secondary="See All Users"
                    sx={{ textAlign: "center" }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <Divider />
            <NavLink to="/dashboard/admin/all-orders">
              <ListItem>
                <ListItemButton>
                  <ListItemText
                    primary="All Orders"
                    secondary="See All Ordered Products"
                    sx={{ textAlign: "center" }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <Divider />

            <NavLink to="/dashboard/admin/all-products">
              <ListItem>
                <ListItemButton>
                  <ListItemText
                    primary="All Products"
                    secondary="See All Created Products"
                    sx={{ textAlign: "center" }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
          </List>
        </nav>
      </Box>
    </div>
  );
};
export default AdminMenu;
  