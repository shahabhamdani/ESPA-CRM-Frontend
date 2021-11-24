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

export default function CreateEmployeeForm() {
  const classes = useStyles();
  let history = useHistory();

  const initialFValues = {
    id: "",
    FirstName: "",
    LastName: "",
    Email: "",
    Address: "",
    GuardianName: "",
    GuardianRelation: "",
    Gender: "",
    CNICNumber: "",
    DateOfBirth: "0000-00-00",
    PhoneNumber: "",
    EmployeeCode: "",
    EmployeeNTN: "",
    CompanyID: "",
    BranchID: "",
    BankAccountNumber: "",
    BankAccountTitle: "",
    BankName: "",
    Active: "",
    EmployeeImage: "",
    EnteredBy: "",
    EnteredOn: "",
  };

  const [values, setValues] = useState(initialFValues);
  const [companies, setCompany] = useState([]);
  const [branches, setBranches] = useState([]);

  const loadCompanies = async () => {
    const result = await api.get("/company");
    setCompany(result.data);
  };

  const loadBranches = async () => {
    const result = await api.get("/branches");
    setBranches(result.data);
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

  const createEmployee = async () => {
    const response = await api.post("/employee", request);
    alert("" + response.statusText);
    history.push("/employee");
  };

  useEffect(() => {
    loadCompanies();
    loadBranches();
  }, []);

  return (
    <div>
      <PageHeader label="Employee" pageTitle="Add Employee" />

      <Paper className={classes.pageContent}>
        <form className={classes.formStye}>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Fist Name"
                name="FirstName"
                onChange={handleInputChange}
                size="small"
                value={values.FirstName}
              ></TextField>

              <TextField
                variant="outlined"
                label="Last Name"
                name="LastName"
                onChange={handleInputChange}
                size="small"
                value={values.LastName}
              ></TextField>

              <TextField
                variant="outlined"
                label="Email"
                name="Email"
                onChange={handleInputChange}
                size="small"
                value={values.Email}
              ></TextField>

              <TextField
                variant="outlined"
                label="Address"
                name="Address"
                onChange={handleInputChange}
                size="small"
                value={values.Address}
              ></TextField>

              <TextField
                variant="outlined"
                label="GuardianName"
                name="GuardianName"
                onChange={handleInputChange}
                size="small"
                value={values.GuardianRelation}
              ></TextField>

              <FormControl
                size="small"
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="GuardianRelation">Guardian Relation</InputLabel>
                <Select
                  name="GuardianRelation"
                  value={values.GuardianRelation}
                  onChange={handleInputChange}
                  size="small"
                  label="Guardian Relation"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Father">Father</MenuItem>
                  <MenuItem value="Mother">Mother</MenuItem>
                  <MenuItem value="Uncle">Uncle</MenuItem>
                  <MenuItem value="Aunt">Aunt</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel id="Gender">Gender</InputLabel>

                <RadioGroup
                  row
                  name="Gender"
                  onChange={handleInputChange}
                  value={values.Gender}
                >
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>

              <TextField
                id="DateOfBirth"
                label="DateOfBirth"
                variant="outlined"
                name="DateOfBirth"
                type="date"
                value={values.DateOfBirth}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                variant="outlined"
                label="CNIC Number"
                name="CNICNumber"
                size="small"
                inputProps={{ maxLength: 13 }}
                onChange={handleInputChange}
                value={values.CNICNumber}
              ></TextField>

              <TextField
                variant="outlined"
                label="Phone Number"
                name="PhoneNumber"
                size="small"
                inputProps={{ maxLength: 11 }}
                onChange={handleInputChange}
                value={values.PhoneNumber}
              ></TextField>

              <TextField
                variant="outlined"
                label="Employee Code"
                name="EmployeeCode"
                size="small"
                inputProps={{ maxLength: 100 }}
                onChange={handleInputChange}
                value={values.EmployeeCode}
              ></TextField>

              <TextField
                variant="outlined"
                label="Employee NTN"
                name="EmployeeNTN"
                size="small"
                inputProps={{ maxLength: 100 }}
                onChange={handleInputChange}
                value={values.EmployeeNTN}
              ></TextField>

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
                size="small"
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="BranchID">BranchID</InputLabel>
                <Select
                  name="BranchID"
                  value={values.BranchID}
                  size="small"
                  onChange={handleInputChange}
                  label="Branch"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {branches.map((branch) => {
                    return (
                      <MenuItem value={branch.id}>{branch.BranchName}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <TextField
                variant="outlined"
                label="BankAccountTitle"
                name="BankAccountTitle"
                onChange={handleInputChange}
                size="small"
                value={values.BankAccountTitle}
              ></TextField>

              <TextField
                variant="outlined"
                label="BankAccountNumber"
                name="BankAccountNumber"
                size="small"
                inputProps={{ maxLength: 100 }}
                onChange={handleInputChange}
                value={values.BankAccountNumber}
              ></TextField>

              <TextField
                variant="outlined"
                label="BankName"
                name="BankName"
                size="small"
                onChange={handleInputChange}
                value={values.BankName}
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

                <Button variant="contained" onClick={createEmployee}>
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

              <TextField
                variant="outlined"
                label="EnteredBy"
                name="EnteredBy"
                size="small"
                onChange={handleInputChange}
                value={values.EnteredBy}
              ></TextField>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}
