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

export default function Profile() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          <MenuItem key={i} component={ListItem} onClick={handleClose}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemIcon>{item.label}</ListItemIcon>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
