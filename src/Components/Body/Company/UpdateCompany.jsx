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
  const { id } = useParams();

  let history = useHistory();

  const initialFValues = {
    companyId: ""+{id},
    companyName: "",
    companyLogo: "",
    active: "N",
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


  const updateCompany = async () => {
    const response = await api.put("/company/", request);
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
                  name="companyName"
                  onChange={handleInputChange}
                  value={values.companyName}
                ></TextField>

                <FormControl>
                  <FormLabel>Active</FormLabel>
                  <RadioGroup
                    row
                    name="active"
                    onChange={handleInputChange}
                    value={values.active}
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
