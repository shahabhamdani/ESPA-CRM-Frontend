import { FormControl, FormLabel, Grid, Paper, Radio } from "@material-ui/core";
import { RadioGroup, FormControlLabel, TextField } from "@material-ui/core";
import Button from "@mui/material/Button";

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { PageHeader } from "../../Common/CommonComponent";
import { useStyles } from "../BodyStyles";
import api from "../../Api/Api";

export default function UpdateCompany() {
  const classes = useStyles();

  let history = useHistory();

  const initialFValues = {
    id: "",
    CompanyName: "",
    CompanyLogo: "",
    Active: "N",
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

  const { id } = useParams();

  const updateCompany = async () => {
    const response = await api.put("/company/" + id, request);
    alert("" + response.statusText);
    history.push("/company");
  };

  const loadCpompanies = async () => {
    const result = await api.get("/company/" + id);
    console.log(result.data);
    setValues(result.data);
  };

  useEffect(() => {
    loadCpompanies();
  }, []);

  return (
    <div>
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
                    <FormControlLabel
                      value="Y"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="N"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>

                  <Button variant="contained" onClick={updateCompany}>
                    Update
                  </Button>
                </FormControl>
              </Grid>
              <Grid item xs={6}></Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    </div>
  );
}
