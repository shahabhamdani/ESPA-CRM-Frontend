import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";
import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { NavLink } from "react-router-dom";
import { useStyles } from "../../Components/Header/HeaderStyles";

export default function SideNavData({ handleDrawerClose }) {
  const classes = useStyles();
  const listItemData = [
    { label: "Dashboard", link: "/", icon: <DashboardIcon /> },
    { label: "Employee", link: "/employee", icon: <PersonAddIcon /> },
    { label: "Link 3", link: "/link3", icon: <PostAddIcon /> },
    { label: "Link 4", link: "/link4", icon: <PostAddIcon /> },
    { label: "Logout", link: "/logout", icon: <ExitToAppIcon /> },
  ];
  return (
    <List>
      {listItemData.map((item, i) => (
        <Button
          size="small"
          className={classes.navButton}
          onClick={handleDrawerClose}
        >
          <ListItem
            exact
            component={NavLink}
            to={item.link}
            className={classes.navLinks}
            activeClassName={classes.activeNavLinks}
            key={i}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText> {item.label}</ListItemText>
          </ListItem>
        </Button>
      ))}
    </List>
  );
}
