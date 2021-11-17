import { blueGrey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles((theme) => ({
  section: {
    margin: theme.spacing(3, 0),
  },

  //page
  pageTitle: {
    color: blueGrey["800"],
    marginBottom: theme.spacing(2),
    textTransform: "capitalize",
  },

  pageSubTitle: {
    color: blueGrey[500],
    margin: theme.spacing(1, 0),
    textTransform: "uppercase",
  },

  table: { padding: "20px" },
}));
