import { blue, blueGrey, purple, red } from "@material-ui/core/colors";
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

  tblButtonEdit: {
    width: "45%",
    margin: "1px",
    textTransform: "capitalize",
    color: "#377dff",
  },

  tableLayout: {
    padding: "20px",
  },

  tblButtonDelete: {
    width: "45%",
    textTransform: "capitalize",
    margin: "1px",
    color: "#ff3737",
  },

  editDeleteButtonsDiv: {
    display: "inline-flex",
  },

  formStye: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },

  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(3),
  },

  crudGrid: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "end",
  },
}));
