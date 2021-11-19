import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Paper,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import { useHistory } from "react-router";
import { PageHeader } from "../../Common/CommonComponent";
import Button from "@mui/material/Button";
import { useStyles } from "../BodyStyles";
import api from "../../Api/Api";
export default function CreateBranchForm() {
  const classes = useStyles();

  let history = useHistory();

  const initialFValues = {
    id: "",
    Type: "",
    CompanyID: "",
    CityID: "",
    BranchName: "",
    LandLineNumber: "",
    CustomerSupport: "",
    WhatsappNumber: "",
    GeoLocation: "",
    CountryID: "",
    ProvenceID: "",
    Active: "",
  };

  const [values, setValues] = useState(initialFValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const request = {
    ...values,
  };

  const createBranch = async () => {
    const response = await api.post("/branches", request);
    alert("" + response.statusText);
    history.push("/branches");
  };
  return (
    <div>
      <PageHeader label="Branches" pageTitle="Add Branch" />

      <Paper className={classes.pageContent}>
        <form className={classes.formStye}>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Branch ID"
                name="id"
                onChange={handleInputChange}
                value={values.CompanyName}
              ></TextField>
              <TextField
                variant="outlined"
                label="Type"
                name="Type"
                onChange={handleInputChange}
                value={values.CompanyName}
              ></TextField>{" "}
              <TextField
                variant="outlined"
                label="Company ID"
                name="BranchName"
                onChange={handleInputChange}
                value={values.CompanyName}
              ></TextField>
              <FormControl>
                <FormLabel>Active</FormLabel>
                <RadioGroup
                  row
                  name="Active"
                  onChange={handleInputChange}
                  value={values.Active}
                >
                  <FormControlLabel value="Y" control={<Radio />} label="Yes" />
                  <FormControlLabel value="N" control={<Radio />} label="No" />
                </RadioGroup>

                <Button variant="contained" onClick={createBranch}>
                  Create
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={6}></Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}
