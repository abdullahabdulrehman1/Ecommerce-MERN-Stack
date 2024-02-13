// import { List } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
const   AdminMenu = () => {
  return (
    <div className="">
      <Box >
        <nav aria-label="main mailbox folders" style={{border: 'none'}}>
          <List  >

            <ListItemText 
              // sx={{ my: 0 }}
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
            <NavLink to="/dashboard/admin/create-category" >
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
                    primary="All User"
                    secondary="See All Users"
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
