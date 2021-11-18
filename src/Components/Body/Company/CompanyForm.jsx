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
import Button from "@mui/material/Button";
import api from "../../Api/Api";
import { PageHeader } from "../../Common/CommonComponent";
import React, { useState, useEffect } from "react";
import { useStyles } from "../BodyStyles";

export default function CompanyForm() {
  const initialFValues = {
    id: "",
    CompanyName: "",
    CompanyLogo: "",
    Active: false,
  };

  const [values, setValues] = useState(initialFValues);
  const classes = useStyles();

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

  const addCompany = async () => {
    const response = await api.post("/company", request);
    console.log(response.data);
  };

  return (
    <div>
      <PageHeader label="Company" pageTitle="Add Company" />

      <Paper className={classes.pageContent}>
        <form className={classes.formStye}>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Company Name"
                name="CompanyName"
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

                <Button variant="contained" onClick={addCompany}>
                  Submit
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
