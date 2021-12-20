import React, { useState } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import image from "./image.png";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {
  Box,
  Menu,
  ListItem,
  MenuItem,
  ListItemIcon,
  Avatar,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router";

export default function Profile() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  let history = useHistory();

  function logout() {
    localStorage.clear();
    window.location.reload(false);
    history.push("/");
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (index) => {
    if (index == 1) {
      logout();
    }
  };

  const dropDownData = [
    { label: "Settings", icon: <SettingsIcon /> },
    { label: "Logout ", icon: <ExitToAppIcon /> },
  ];

  return (
    <Box>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        startIcon={<Avatar src={image}></Avatar>}
      ></Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {dropDownData.map((item, i) => (
          <MenuItem
            key={i}
            component={ListItem}
            onClick={(event) => handleMenuItemClick(i)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemIcon>{item.label}</ListItemIcon>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
