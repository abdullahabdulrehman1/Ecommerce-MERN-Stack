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

const UserMenu = () => {
  return (
    <div className="">
      <Box>
        <nav aria-label="main mailbox folders" style={{ border: 'none' }}>
          <List>
            <ListItemText
              primary="User Panel"
              primaryTypographyProps={{
                fontSize: 40,
                fontWeight: "medium",
                letterSpacing: 0,
                fontFamily: "Roboto",
                fontStyle: "bold",
              }}
              sx={{ textAlign: "center" }}
            />
            <NavLink to="/dashboard/user/profile">
              <ListItem>
                <ListItemButton className="block border">
                  <ListItemText
                    primary="Profile"
                    sx={{ textAlign: "center" }}
                  />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <Divider />
            <NavLink to="/dashboard/user/orders">
              <ListItem>
                <ListItemButton className="block border">
                  <ListItemText
                    primary="All Orders"
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

export default UserMenu;
