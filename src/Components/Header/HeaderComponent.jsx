import React, { useState } from "react";
import Navbar from "./Navbar";
import SideNav from "./SideNav";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../Body/Dashboard/Dashboard";
import Company from "../Body/Company/Company";
import Employee from "../Body/Employee";
import Link3 from "../Body/Link3";
import Link4 from "../Body/Link4";
import Link5 from "../Body/Link5";
import Notification from "../Body/Notification";
import Logout from "../Body/logout";
import Branches from "../Body/Branches";
import { Box } from "@material-ui/core";
import { useStyles } from "./HeaderStyles";

export default function HeaderComponent() {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerOpen = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  return (
    <div>
      <Navbar handleDrawerOpen={handleDrawerOpen} />
      <SideNav
        mobileOpen={mobileOpen}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />

      <Box className={classes.wrapper}>
        <Switch>
          <Route exact path="/company" render={() => <Company />} />
          <Route exact path="/employee" render={() => <Employee />} />
          <Route exact path="/link3" render={() => <Link3 />} />
          <Route exact path="/link4" render={() => <Link4 />} />
          <Route exact path="/link5" render={() => <Link5 />} />
          <Route exact path="/notification" render={() => <Notification />} />
          <Route exact path="/branches" render={() => <Branches />} />
          <Route exact path="/logout" render={() => <Logout />} />
          <Route exact path="/" render={() => <Dashboard />} />
        </Switch>
      </Box>
    </div>
  );
}
