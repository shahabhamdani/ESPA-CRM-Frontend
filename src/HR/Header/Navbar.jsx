import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Box, Hidden, IconButton } from "@material-ui/core";
import Profile from "./Navtabs/Profile";
import Notification from "./Navtabs/notification";
import MenuIcon from "@material-ui/icons/Menu";
import { useStyles } from "./HeaderStyles";

export default function Navbar({ handleDrawerOpen }) {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.logo}>
      <Toolbar className={classes.Toolbar}>
        <Typography variant="h6" className={classes.logo}>
          {"ESPA ERP"}
        </Typography>

        <Hidden smDown>
          <Box style={{ display: "flex" }}>
            <Profile />
            <Notification />
          </Box>
        </Hidden>

        <Hidden mdUp>
          <IconButton color="inherit" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
