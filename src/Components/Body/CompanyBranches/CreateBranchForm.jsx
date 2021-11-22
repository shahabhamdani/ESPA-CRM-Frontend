import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  TextField,
  Paper,
  RadioGroup,
  Select,
  MenuItem,
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

  const [companies, setCompany] = useState([]);

  const loadCompanies = async () => {
    const result = await api.get("/company");
    setCompany(result.data);
  };
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

  useEffect(() => {
    loadCompanies();
  }, []);

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
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Branch Type
                </InputLabel>
                <Select
                  name="Type"
                  value={values.Type}
                  onChange={handleInputChange}
                  label="Branch Type"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Main Branch</MenuItem>
                  <MenuItem value={0}>Sub Branch</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Company
                </InputLabel>
                <Select
                  name="CompanyID"
                  value={values.CompanyID}
                  onChange={handleInputChange}
                  label="Company"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {companies.map((company) => {
                    return (
                      <MenuItem value={company.id}>
                        {company.CompanyName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
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
