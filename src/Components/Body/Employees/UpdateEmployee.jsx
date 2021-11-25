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
import { PageHeader } from "../../Common/CommonComponent";
import Button from "@mui/material/Button";
import { useStyles } from "../BodyStyles";
import api from "../../Api/Api";

export default function UpdateEmployee() {
  const classes = useStyles();
  let history = useHistory();

  const date = new Date().toLocaleDateString() + "";

  const initialFValues = {
    id: "",
    FirstName: "",
    LastName: "",
    Email: "",
    Address: "",
    EmployeeImage: "",
    GuardianName: "",
    GuardianRelation: "",
    Gender: "",
    CNICNumber: "",
    DateOfBirth: "",
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

  const [name, setName] = useState("");
  const [image, setImage] = useState();

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

  const [imgRef, setImageRef] = useState();

  const oneImageUpload = (e) => {
    const file = e.target.files[0];
    setImageRef(URL.createObjectURL(file));
    setImage(file);
  };

  const { id } = useParams();

  const updateEmployee = async () => {
    const response = await api.put("/employee/" + id, request);
    alert("" + response.statusText);
    history.push("/employee");
  };

  const loadEmployee = async () => {
    const result = await api.get("/employee/" + id);
    console.log(result.data);
    setValues(result.data);
  };

  useEffect(() => {
    loadEmployee();
    loadCompanies();
    loadBranches();
  }, []);

  return (
    <div>
      <PageHeader label="Employee" pageTitle="Add Employee" />
      <div Style="padding:10px;">
        <input
          accept="image/*"
          className={classes.uploadImage}
          id="contained-button-file"
          type="file"
          value={name}
          onChange={oneImageUpload}
        />

        <div className={classes.imageUploadDiv}>
          <img alt="" src={imgRef} className={classes.companyCreateImage}></img>

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
      </div>

      <Paper className={classes.pageContent}>
        <form className={classes.formStye}>
          <Grid container>
            <Grid item xs={12}></Grid>
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
                multiline
                rows={4}
                value={values.Address}
              ></TextField>

              <TextField
                variant="outlined"
                label="GuardianName"
                name="GuardianName"
                onChange={handleInputChange}
                size="small"
                value={values.GuardianName}
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

              <TextField
                id="date"
                label="DateOfBirth"
                size="small"
                variant="outlined"
                type="date"
                name="DateOfBirth"
                defaultValue={values.DateOfBirth}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  size="small"
                  row
                  name="Gender"
                  onChange={handleInputChange}
                  value={values.Gender}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                    Active
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
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
                size="small"
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="BranchID">Branch</InputLabel>
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

              <FormControl>
                <FormLabel>Active</FormLabel>
                <RadioGroup
                  row
                  size="small"
                  name="Active"
                  onChange={handleInputChange}
                  value={values.Active}
                >
                  <FormControlLabel value="Y" control={<Radio />} label="Yes" />
                  <FormControlLabel value="N" control={<Radio />} label="No" />
                </RadioGroup>

                <Button variant="contained" onClick={updateEmployee}>
                  Update
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

              <TextField
                disabled
                label="EnteredOn"
                size="small"
                variant="outlined"
                name="EnteredOn"
                value={values.EnteredOn}
                InputLabelProps={{
                  shrink: true,
                }}
              />

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
