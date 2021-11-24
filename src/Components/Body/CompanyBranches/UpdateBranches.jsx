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
import { useHistory, useParams } from "react-router";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { IconButton } from "@material-ui/core";

import { PageHeader } from "../../Common/CommonComponent";
import Button from "@mui/material/Button";

import { useStyles } from "../BodyStyles";
import api from "../../Api/Api";

export default function UpdateBranches() {
  const classes = useStyles();

  let history = useHistory();

  const initialFValues = {
    id: "",
    Type: "",
    CompanyID: "",
    CityID: "",
    BranchName: "",
    BranchEmail: "",
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
  const [cities, setCities] = useState([]);
  const [provences, setProvences] = useState([]);
  const [countries, setCountries] = useState([]);

  const loadCompanies = async () => {
    const result = await api.get("/company");
    setCompany(result.data);
  };

  const loadCities = async () => {
    const cityResult = await api.get("/cities");
    setCities(cityResult.data);
  };

  const loadProvence = async () => {
    const provenceResult = await api.get("/provence");
    setProvences(provenceResult.data);
  };

  const loadCountries = async () => {
    const countryResult = await api.get("/countries");
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

  const { id } = useParams();

  const updateBranch = async () => {
    const response = await api.put("/branches/" + id, request);
    alert("" + response.statusText);
    history.push("/branches");
  };

  const loadBranch = async () => {
    const result = await api.get("/branches/" + id);
    console.log(result.data);
    setValues(result.data);
  };

  useEffect(() => {
    loadCompanies();
    loadCities();
    loadCountries();
    loadProvence();
    loadBranch();
  }, []);

  return (
    <div>
      <IconButton onClick={() => history.push("/branches")}>
        <ArrowBackIosIcon fontSize="small" />{" "}
      </IconButton>
      <PageHeader label="Branches" pageTitle="Update Branch" />

      <Paper className={classes.pageContent}>
        <form className={classes.formStye}>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Branch Name"
                name="BranchName"
                onChange={handleInputChange}
                size="small"
                value={values.BranchName}
              ></TextField>
              <TextField
                variant="outlined"
                label="Branch Email"
                name="BranchEmail"
                type="email"
                onChange={handleInputChange}
                size="small"
                value={values.BranchEmail}
              ></TextField>

              <FormControl
                size="small"
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Branch Type
                </InputLabel>
                <Select
                  name="Type"
                  value={values.Type}
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

              <FormControl
                size="small"
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="CompanyID">Company</InputLabel>
                <Select
                  name="CompanyID"
                  value={values.CompanyID}
                  size="small"
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

              <FormControl
                variant="outlined"
                size="small"
                className={classes.formControl}
              >
                <InputLabel id="CityID">City</InputLabel>
                <Select
                  name="CityID"
                  value={values.CityID}
                  onChange={handleInputChange}
                  label="City"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {cities.map((city) => {
                    return <MenuItem value={city.id}>{city.CityName}</MenuItem>;
                  })}
                </Select>
              </FormControl>

              <FormControl
                size="small"
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="CountryID">Country</InputLabel>
                <Select
                  name="CountryID"
                  value={values.CountryID}
                  onChange={handleInputChange}
                  label="Country"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {countries.map((country) => {
                    return (
                      <MenuItem value={country.id}>
                        {country.CountryName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl
                size="small"
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="ProvenceID">Provence</InputLabel>
                <Select
                  name="ProvenceID"
                  value={values.ProvenceID}
                  onChange={handleInputChange}
                  label="ProvencE"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {provences.map((provence) => {
                    return (
                      <MenuItem value={provence.id}>
                        {provence.ProvenceName}
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

                <Button variant="contained" onClick={updateBranch}>
                  Create
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="LandLine Number"
                name="LandLineNumber"
                size="small"
                inputProps={{ maxLength: 10 }}
                onChange={handleInputChange}
                value={values.LandLineNumber}
              ></TextField>

              <TextField
                variant="outlined"
                label="Customer Support"
                name="CustomerSupport"
                size="small"
                inputProps={{ maxLength: 10 }}
                onChange={handleInputChange}
                value={values.CustomerSupport}
              ></TextField>

              <TextField
                variant="outlined"
                label="Whatsapp Number"
                name="WhatsappNumber"
                size="small"
                inputProps={{ maxLength: 10 }}
                onChange={handleInputChange}
                value={values.WhatsappNumber}
              ></TextField>

              <TextField
                variant="outlined"
                label="GeoLocation"
                name="GeoLocation"
                type="email"
                onChange={handleInputChange}
                size="small"
                value={values.GeoLocation}
              ></TextField>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}
