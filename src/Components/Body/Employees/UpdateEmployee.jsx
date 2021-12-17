import axios from "axios";
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
  const { id } = useParams();

  const date = new Date().toLocaleDateString() + "";

  const initialFValues = {
    employeeId: "" + { id },
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    employeeImage: "",
    guardianName: "",
    guardianRelation: "",
    gender: "",
    cnicnumber: "",
    geoLocation: "",
    dateOfBirth: "",
    phoneNumber: "",
    employeeCode: "",
    companyId: "",
    branchId: "",
    bankAccountNumber: "",
    customerSupport: "",
    landLineNumber: "",
    employeeNtn: "",
    whatsappNumber: "",
    bankAccountTitle: "",
    bankName: "",
    active: "",
    enteredBy: "",
    enteredOn: "" + date,
  };

  const [name, setName] = useState("");
  const [image, setImage] = useState();

  const [values, setValues] = useState(initialFValues);
  const [companies, setCompany] = useState([]);
  const [branches, setBranches] = useState([]);

  const loadImage = (img) => {
    fetch(
      "https://ozurb6ve12.execute-api.ap-south-1.amazonaws.com/dev/espa-crm-files/" +
        img,
      {
        headers: {
          "Content-Type": "image/jpeg",
        },
      }
    )
      .then((response) => response.blob())
      .then((imageBlob) => {
        // Then create a local URL for that image and print it
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImageRef(imageObjectURL);
      });

    /*
    api
      .get("/imageupload/" + img, { responseType: "blob" })
      .then(function (response) {
        var reader = new window.FileReader();
        reader.readAsDataURL(response.data);
        reader.onload = function () {
          var imageDataUrl = reader.result;
          setImageRef(imageDataUrl);
        };
      });*/
  };

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
    setImage(file);
    setImageRef(URL.createObjectURL(file));
  };

  const updateEmployee = async () => {
    var formData = new FormData();
    var imagefile = image;

    request.employeeImage = "" + values.cnicnumber + imagefile.name;
    alert(imagefile.name);

    formData.append("files", imagefile);
    formData.append("id", "" + values.cnicnumber);

    api.post("/imageupload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const response = await api.put("/employee/", request);
    alert("" + response.statusText);
    history.push("/employee");
  };

  const loadEmployee = async () => {
    const result = await api.get("/employee/" + id);
    loadImage(result.data.employeeImage);
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
                name="dateOfBirth"
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

                <Button variant="contained" onClick={updateEmployee}>
                  Update
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
