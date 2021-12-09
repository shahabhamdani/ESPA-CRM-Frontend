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

  uploadImage: {
    display: "none",
  },

  imageUploadDiv: {
    display: "grid",
    textAlign: "center",
    width: "fit-content",
  },

  companyCreateImage: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    padding: "5px",
  },

  tblButtonView: {
    width: "45%",
    margin: "1px",
    textTransform: "capitalize",
    color: "#ffd037",
  },
  tableLayout: {
    padding: "10px",
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
    flexFlow: "row wrap",
    padding: "10px",
    justifyContent: "end",
  },
}));
