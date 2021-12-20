import React, { useState, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

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

  const { id } = useParams();

  let history = useHistory();

  const initialFValues = {
    branchId: "" + { id },
    type: "",
    companyId: "",
    cityId: "",
    branchName: "",
    branchEmail: "",
    landLineNumber: "",
    customerSupport: "",
    whatsappNumber: "",
    geoLocation: "",
    countryId: "",
    provenceId: "",
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

  const loadCities = async (provId) => {
    const cityResult = await api.get("/city/" + provId);
    await setCities(cityResult.data);
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

    if (name == "provenceId") {
      loadCities(value);
    }

    setValues({
      ...values,
      [name]: value,
    });
  };

  const request = {
    ...values,
  };

  const updateBranch = async () => {
    const response = await api.put("/branches/", request);
    alert("" + response.statusText);
    history.push("/branches");
  };

  const loadBranch = async () => {
    const result = await api.get("/branches/" + id);
    setValues(result.data);
  };

  useEffect(() => {
    loadCompanies();
    loadCountries();
    loadProvence();
    loadBranch();
    loadCities(values.provenceId);
  }, []);

  return (
    <div>
      <PageHeader label="Branches" pageTitle="Add Branch" />

      <Paper className={classes.pageContent}>
        <ValidatorForm
          onSubmit={updateBranch}
          className={classes.formStye}
          onError={(errors) => console.log(errors)}
        >
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

              <TextValidator
                variant="outlined"
                onChange={handleInputChange}
                label="Branch Email"
                name="branchEmail"
                value={values.branchEmail}
                size="small"
                validators={["required", "isEmail"]}
                errorMessages={["this field is required", "email is not valid"]}
              />

              <FormControl
                size="small"
                variant="outlined"
                className={classes.formControl}
              >
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

              <FormControl
                size="small"
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="companyId">Company</InputLabel>
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

              <FormControl
                size="small"
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="countryId">Country</InputLabel>
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

              <FormControl
                size="small"
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="provenceId">Provence</InputLabel>
                <Select
                  name="provenceId"
                  value={values.provenceId}
                  onChange={handleInputChange}
                  label="Provence"
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

              <FormControl
                variant="outlined"
                size="small"
                className={classes.formControl}
              >
                <InputLabel id="cityId">City</InputLabel>
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
                      <MenuItem value={city.cityId}>{city.cityName}</MenuItem>
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
                  <FormControlLabel
                    selected
                    value="Y"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="N" control={<Radio />} label="No" />
                </RadioGroup>

                <Button type="submit" variant="contained">
                  Update
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                label="LandLine Number"
                name="landLineNumber"
                type="tel"
                size="small"
                inputProps={{ maxLength: 11 }}
                onChange={handleInputChange}
                value={values.landLineNumber}
                validators={["required", "isNumber"]}
                errorMessages={[
                  "this field is required",
                  "number is not valid",
                ]}
              ></TextValidator>
              <TextValidator
                variant="outlined"
                label="Customer Support"
                name="customerSupport"
                type="tel"
                size="small"
                inputProps={{ maxLength: 11 }}
                onChange={handleInputChange}
                value={values.customerSupport}
                validators={["required", "isNumber"]}
                errorMessages={[
                  "this field is required",
                  "number is not valid",
                ]}
              ></TextValidator>
              <TextValidator
                variant="outlined"
                label="Whatsapp Number"
                name="whatsappNumber"
                type="tel"
                size="small"
                inputProps={{ maxLength: 11 }}
                onChange={handleInputChange}
                value={values.whatsappNumber}
                validators={["required", "isNumber"]}
                errorMessages={[
                  "this field is required",
                  "number is not valid",
                ]}
              ></TextValidator>

              <TextField
                variant="outlined"
                label="GeoLocation"
                name="geoLocation"
                onChange={handleInputChange}
                size="small"
                value={values.geoLocation}
              ></TextField>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Paper>
    </div>
  );
}
