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
import * as moment from "moment";

export default function CreateEmployeeForm() {
  const classes = useStyles();
  let history = useHistory();

  const temp = new Date().toLocaleDateString();

  const date = moment(temp.BeginDate_1).format("YYYY-MM-DD");

  const initialFValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    companyId: 1,
    branchId: 1,
    enteredBy: "",
    enteredOn: date,
    address: "",
    guardianRelation: "",
    guardianName: "",
    dateOfBirth: "",
    gender: "",
    mobileNumber: "",
    cnicnumber: "",
    employeeImage: "",
    employeeCode: "",
    employeeNtn: "",
    bankAccountNumber: "",
    bankAccountTitle: "",
    bankName: "",
    active: "",
  };

  const [file, setFile] = useState([]);

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
    setFile(file);
    setImageRef(URL.createObjectURL(file));
  };

  const createEmployee = async () => {
    var formData = new FormData();
    var imagefile = file;

    request.employeeImage = "" + values.cnicnumber + imagefile.name;
    alert(imagefile.name);

    formData.append("files", imagefile);
    formData.append("id", "" + values.cnicnumber);

    api.post("/imageupload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    request.dateOfBirth = moment(request.dateOfBirth.BeginDate_1).format(
      "YYYY-MM-DD"
    );
    const response = await api
      .post("/employee", request)

      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });

    history.push("/employee");
  };

  useEffect(() => {
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
          //value={image}
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
                name="firstName"
                onChange={handleInputChange}
                size="small"
                value={values.firstName}
              ></TextField>

              <TextField
                variant="outlined"
                label="Last Name"
                name="lastName"
                onChange={handleInputChange}
                size="small"
                value={values.lastName}
              ></TextField>

              <TextField
                variant="outlined"
                label="Email"
                name="email"
                onChange={handleInputChange}
                size="small"
                value={values.email}
              ></TextField>

              <TextField
                variant="outlined"
                label="Address"
                name="address"
                onChange={handleInputChange}
                size="small"
                multiline
                rows={4}
                value={values.address}
              ></TextField>

              <TextField
                variant="outlined"
                label="GuardianName"
                name="guardianName"
                onChange={handleInputChange}
                size="small"
                value={values.guardianName}
              ></TextField>

              <FormControl
                size="small"
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="GuardianRelation">Guardian Relation</InputLabel>
                <Select
                  name="guardianRelation"
                  value={values.guardianRelation}
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
                inputFormat="yyyy-MM-dd"
                name="dateOfBirth"
                format="YYYY-MM-DD"
                defaultValue={values.dateOfBirth}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  size="small"
                  row
                  name="gender"
                  onChange={handleInputChange}
                  value={values.gender}
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
                <InputLabel id="BranchID">Branch</InputLabel>
                <Select
                  name="branchId"
                  value={values.branchId}
                  size="small"
                  onChange={handleInputChange}
                  label="Branch"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {branches.map((branch) => {
                    return (
                      <MenuItem value={branch.branchId}>
                        {branch.branchName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Active</FormLabel>
                <RadioGroup
                  row
                  size="small"
                  name="active"
                  onChange={handleInputChange}
                  value={values.active}
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
                label="CNIC Number"
                name="cnicnumber"
                size="small"
                inputProps={{ maxLength: 13 }}
                onChange={handleInputChange}
                value={values.cnicnumber}
              ></TextField>

              <TextField
                variant="outlined"
                label="Phone Number"
                name="phoneNumber"
                size="small"
                inputProps={{ maxLength: 11 }}
                onChange={handleInputChange}
                value={values.phoneNumber}
              ></TextField>

              <TextField
                variant="outlined"
                label="Employee Code"
                name="employeeCode"
                size="small"
                inputProps={{ maxLength: 100 }}
                onChange={handleInputChange}
                value={values.employeeCode}
              ></TextField>

              <TextField
                variant="outlined"
                label="Employee NTN"
                name="employeeNtn"
                size="small"
                inputProps={{ maxLength: 100 }}
                onChange={handleInputChange}
                value={values.employeeNtn}
              ></TextField>
              <TextField
                variant="outlined"
                label="BankAccountTitle"
                name="bankAccountTitle"
                onChange={handleInputChange}
                size="small"
                value={values.bankAccountTitle}
              ></TextField>

              <TextField
                variant="outlined"
                label="BankAccountNumber"
                name="bankAccountNumber"
                size="small"
                inputProps={{ maxLength: 100 }}
                onChange={handleInputChange}
                value={values.bankAccountNumber}
              ></TextField>

              <TextField
                variant="outlined"
                label="BankName"
                name="bankName"
                size="small"
                onChange={handleInputChange}
                value={values.bankName}
              ></TextField>

              <TextField
                disabled
                label="EnteredOn"
                size="small"
                variant="outlined"
                inputFormat="yyyy-MM-dd"
                name="enteredOn"
                value={values.enteredOn}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                variant="outlined"
                label="EnteredBy"
                name="enteredBy"
                size="small"
                onChange={handleInputChange}
                value={values.enteredBy}
              ></TextField>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}
