import React, { useState } from "react";
import Navbar from "../../Components/Header/Navbar";
import SideNav from "./SideNav";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../Body/Dashboard/Dashboard";
import Employee from "../../Components/Body/Employees/Employee";
import Link3 from "../Body/Link3";
import Link4 from "../Body/Link4";
//import Logout from "../Body/Logout";
import { useHistory } from "react-router";

import { Box } from "@material-ui/core";
import { useStyles } from "../../Components/Header/HeaderStyles";
import ViewEmployee from "../../Components/Body/Employees/ViewEmployee";
import UpdateEmployee from "../../Components/Body/Employees/UpdateEmployee";
import CreateEmployeeForm from "../../Components/Body/Employees/CreateEmployeeForm";
import CreateUser from "../../Components/Body/Users/CreateUser";
import JobInfo from "../../Components/Body/JobInfo/JobInfo";

export default function HeaderComponent() {
  let history = useHistory();

  function logout() {
    localStorage.clear();
    history.push("/");
    window.location.reload(false);
  }

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
          <Route exact path="/employee" render={() => <Employee />} />
          <Route exact path="/link3" render={() => <Link3 />} />
          <Route exact path="/link4" render={() => <Link4 />} />
          <Route exact path="/logout" render={() => logout()} />
          <Route exact path="/" render={() => <Dashboard />} />

          <Route
            exact
            path="/employee/view/:id"
            render={() => <ViewEmployee />}
          />
          <Route
            exact
            path="/employee/update/:id"
            render={() => <UpdateEmployee />}
          />
          <Route
            exact
            path="/employee/jobInfo/:id"
            render={() => <JobInfo />}
          />
          <Route
            exact
            path="/employee/create"
            render={() => <CreateEmployeeForm />}
          />

          <Route exact path="/user/create/:id" render={() => <CreateUser />} />
        </Switch>
      </Box>
    </div>
  );
}
