import { makeStyles } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  Toolbar: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between",
  },

  logo: {
    color: "white",
    backgroundColor: "#377dff",
  },

  navList: {
    minWidth: "250px",
    maxWidth: "300px",
  },

  //wrapper of main container
  wrapper: {
    height: "100vh",
    background: "#f7f7f7",

    padding: theme.spacing(2, 2, 0, 35),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2, 2),
    },
  },

  //Side nave
  drawerPaper: {
    width: "250px",
    marginTop: "65px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0px",
    },
  },

  navLinks: {
    color: blueGrey["A400"],
    "& :hover, &:hover div": {
      color: "#73a4fd",
    },
    "& div": {
      color: blueGrey["A400"],
    },
  },

  activeNavLinks: {
    color: "#377dff",
    "& div": {
      color: "#377dff",
    },
  },

  navButton: {
    width: "100%",
    textTransform: "capitalize",
  },
}));
