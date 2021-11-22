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
  Avatar,
} from "@material-ui/core";
import { useHistory } from "react-router";
import { PageHeader } from "../../Common/CommonComponent";
import Button from "@mui/material/Button";
import { useStyles } from "../BodyStyles";
import api from "../../Api/Api";

export default function CreateCompany() {
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

  const createCompany = async () => {
    const response = await api.post("/company", request);
    alert("" + response.statusText);
    history.push("/company");
  };

  const [imgRef, setImageRef] = useState();

  const oneImageUpload = (e) => {
    const file = e.target.files[0];

    setImageRef(URL.createObjectURL(file));
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

                <Button variant="contained" onClick={createCompany}>
                  Create
                </Button>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <input
                accept="image/*"
                className={classes.uploadImage}
                id="contained-button-file"
                type="file"
                onChange={oneImageUpload}
              />

              <div className={classes.imageUploadDiv}>
                <img
                  alt=""
                  src={imgRef}
                  className={classes.companyCreateImage}
                ></img>

                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    component="span"
                  >
                    Upload
                  </Button>
                </label>
              </div>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}
