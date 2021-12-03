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
    type: "",
    companyId: 0,
    cityId: 0 ,
    branchName: "",
    branchEmail: "",
    landLineNumber: "",
    customerSupport: "",
    whatsappNumber: "",
    geoLocation: "",
    countryId: 0,
    provenceId: 0,
    active: "",
  };

  const [values, setValues] = useState(initialFValues);

  const [companies, setCompany] = useState([]);
  const [cities, setCities] = useState([]);
  const [provences, setProvences] = useState([]);
  const [countries, setCountries] = useState([]);




  const loadCompanies = async () => {
    const result = await api.get("/company");
    setCompany(result.data);
  };
  
  const loadCities = async () => {
    const cityResult = await api.get("/city");
    setCities(cityResult.data);
  };

  const loadProvence = async () => {
    const provenceResult = await api.get("/provence");
    setProvences(provenceResult.data);
  };

  const loadCountries = async () => {
    const countryResult = await api.get("/country");
    setCountries(countryResult.data);
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
    loadCities();
    loadCountries();
    loadProvence();

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
                label="Branch Name"
                name="branchName"
                onChange={handleInputChange}
                size="small"
                value={values.branchName}
              ></TextField>
               <TextField
                variant="outlined"
                label="Branch Email"
                name="branchEmail"
                type="email"
                onChange={handleInputChange}
                size="small"
                value={values.branchEmail}
              ></TextField>
             
              <FormControl size="small" variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Branch Type
                </InputLabel>
                <Select
                  name="type"
                  value={values.type}
                  onChange={handleInputChange}
                  size="small"

                  label="Branch Type"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Main Branch</MenuItem>
                  <MenuItem value={0}>Sub Branch</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" variant="outlined" className={classes.formControl}>
                <InputLabel id="companyId">
                  Company
                </InputLabel>
                <Select
                  name="companyId"
                  value={values.companyId}
                  size="small"

                  onChange={handleInputChange}
                  label="Company"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {companies.map((company) => {
                    return (
                      <MenuItem value={company.companyId}>
                        {company.companyName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>


              <FormControl variant="outlined" size="small" className={classes.formControl}>
                <InputLabel id="cityId">
                  City
                </InputLabel>
                <Select
                  name="cityId"
                  value={values.cityId}
                  onChange={handleInputChange}
                  label="City"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {cities.map((city) => {
                    return (
                      <MenuItem value={city.cityId}>
                        {city.cityName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl> 


              <FormControl size="small" variant="outlined" className={classes.formControl}>
                <InputLabel id="countryId">
                  Country
                </InputLabel>
                <Select
                  name="countryId"
                  value={values.countryId}
                  onChange={handleInputChange}
                  label="Country"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {countries.map((country) => {
                    return (
                      <MenuItem value={country.countryId}>
                        {country.countryName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>


              <FormControl  size="small" variant="outlined" className={classes.formControl}>
                <InputLabel id="provenceId">
                  Provence
                </InputLabel>
                <Select
                  name="provenceId"
                  value={values.provenceId}
                  onChange={handleInputChange}
                  label="ProvencE"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {provences.map((provence) => {
                    return (
                      <MenuItem value={provence.provenceId}>
                        {provence.provenceName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Active</FormLabel>
                <RadioGroup
                  row
                  name="active"
                  onChange={handleInputChange}
                  value={values.active}
                >
                  <FormControlLabel value="Y" control={<Radio />} label="Yes" />
                  <FormControlLabel value="N" control={<Radio />} label="No" />
                </RadioGroup>

                <Button variant="contained" onClick={createBranch}>
                  Create
                </Button>
              </FormControl>

              </Grid>
            <Grid item xs={6}>

              
            <TextField
                variant="outlined"
                label="LandLine Number"
                name="landLineNumber"
                size="small"
                inputProps={{ maxLength: 10 }} 
                onChange={handleInputChange}
                value={values.landLineNumber}
              ></TextField>

              
              <TextField
                variant="outlined"
                label="Customer Support"
                name="customerSupport"
                size="small"
                inputProps={{ maxLength: 10 }} 
                onChange={handleInputChange}
                value={values.customerSupport}
              ></TextField>

              
              <TextField
                variant="outlined"
                label="Whatsapp Number"
                name="whatsappNumber"
                size="small"
                inputProps={{ maxLength: 10 }} 
                onChange={handleInputChange}
                value={values.whatsappNumber}
              ></TextField>

<TextField
                variant="outlined"
                label="GeoLocation"
                name="geoLocation"
                type="email"
                onChange={handleInputChange}
                size="small"
                value={values.geoLocation}
              ></TextField>


            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}
