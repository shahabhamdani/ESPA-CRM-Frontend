import React, { useState } from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";

import {
  Box,
  Menu,
  ListItem,
  List,
  ListItemIcon,
  IconButton,
  Badge,
  Avatar,
} from "@material-ui/core";
import { useStyles } from "../HeaderStyles";
import { ListItemText } from "@mui/material";

export default function Notification() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dropDownData = [
    { label: "User1", desc: "xyz" },
    { label: "User2 ", desc: "xyz" },
    { label: "User3 ", desc: "xyz" },
    { label: "User4 ", desc: "xyz" },
    { label: "User5 ", desc: "xyz" },
    { label: "User6 ", desc: "xyz" },
  ];

  return (
    <Box>
      <IconButton
        aria-controls="notification"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <Badge badgeContent={3} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        id="notification"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <List className={classes.navList}>
          {dropDownData.map((item, i) => (
            <ListItem key={i} onClick={handleClose}>
              <ListItemIcon>
                <Avatar>{item.label[0].toUpperCase()}</Avatar>
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                secondary={item.desc}
              ></ListItemText>
            </ListItem>
          ))}
        </List>
      </Menu>
    </Box>
  );
}
