import axios from "axios";
import React, { useState, useEffect } from "react";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

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
    phoneNumber: "",
    companyId: 0,
    branchId: 0,
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
    cnicFile: "",
    employmentLetterFile: "",
    securityChequeFile: "",
    emergencyNumber: "",
    guardianNumber: "",
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
          "Content-Type": "image/*",
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

  const [empLetter, setEmpLetter] = useState();
  const [SecCheque, setSecCheque] = useState();
  const [cnic, setCnic] = useState();

  const [SecChequeColor, setSecChequeColor] = useState("inherit");
  const [empLetterColor, setEmpLetterColor] = useState("inherit");
  const [cnicColor, setCnicColor] = useState("inherit");

  const securityChequeChangeHandler = (event) => {
    setSecCheque(event.target.files[0]);
    setSecChequeColor("primary");
  };

  const empLetterChangeHandler = (event) => {
    setEmpLetter(event.target.files[0]);
    setEmpLetterColor("primary");
  };

  const cnicChangeHandler = (event) => {
    setCnic(event.target.files[0]);
    setCnicColor("primary");
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
    if (cnic == null) {
      alert("Please Attach cnic");
    } else if (SecCheque == null) {
      alert("Please Attach Security Cheque");
    } else if (empLetter == null) {
      alert("Please Attach employment Letter");
    } else {
      var imagefile = image;

      request.employeeImage = "dp_" + values.cnicnumber;

      request.cnicFile = values.cnicnumber + cnic.name;
      request.employmentLetterFile = values.cnicnumber + empLetter.name;
      request.securityChequeFile = values.cnicnumber + SecCheque.name;

      putMultipleFiles(
        {
          f: cnic,
        },
        {
          f: empLetter,
        },
        {
          f: SecCheque,
        }
      );

      async function putMultipleFiles(...objectsToGet) {
        await Promise.all(
          objectsToGet.map((obj) =>
            axios({
              method: "put",
              url:
                "https://ozurb6ve12.execute-api.ap-south-1.amazonaws.com/dev/espa-crm-files/" +
                values.cnicnumber +
                obj.f.name,
              data: obj.f,
              headers: {
                "Content-Type": "image/*",
              },
            })
              .then(function (response) {
                //handle success
                console.log(response);
              })
              .catch(function (response) {
                //handle error
                console.log(response);
              })
          )
        );
      }

      axios({
        method: "put",
        url:
          "https://ozurb6ve12.execute-api.ap-south-1.amazonaws.com/dev/espa-crm-files/dp_" +
          values.cnicnumber,
        data: imagefile,
        headers: {
          "Content-Type": "image/*",
        },
      })
        .then(function (response) {
          //handle success
          console.log(response);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });

      const response = await api.put("/employee/", request);
      alert("" + response.statusText);
      history.push("/employee");
    }
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
      <PageHeader label="Employee" pageTitle="Update Employee" />
      <div Style="padding:10px;">
        <input
          accept="image/*"
          className={classes.uploadImage}
          id="contained-button-file"
          type="file"
          //value={image}
          onChange={oneImageUpload}
        />
        <input
          accept="file/*"
          className={classes.uploadImage}
          id="securityChequeBtn"
          type="file"
          onChange={securityChequeChangeHandler}
        />

        <input
          accept="file/*"
          className={classes.uploadImage}
          id="cnic"
          type="file"
          onChange={cnicChangeHandler}
        />

        <input
          accept="file/*"
          className={classes.uploadImage}
          id="empLetter"
          type="file"
          onChange={empLetterChangeHandler}
        />

        <div className={classes.imageUploadDiv}>
          <img alt="" src={imgRef} className={classes.companyCreateImage}></img>

          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              size="small"
              color="primary"
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              image
            </Button>
          </label>
        </div>

        <label htmlFor="securityChequeBtn">
          <Button
            variant="contained"
            size="small"
            color={SecChequeColor}
            startIcon={<CloudUploadIcon />}
            component="span"
          >
            Security Cheque
          </Button>
        </label>

        <label htmlFor="empLetter">
          <Button
            variant="contained"
            size="small"
            color={empLetterColor}
            startIcon={<CloudUploadIcon />}
            component="span"
          >
            Employment Letter
          </Button>
        </label>

        <label htmlFor="cnic">
          <Button
            variant="contained"
            size="small"
            color={cnicColor}
            startIcon={<CloudUploadIcon />}
            component="span"
          >
            Cnic
          </Button>
        </label>
      </div>

      <Paper className={classes.pageContent}>
        <ValidatorForm
          onSubmit={updateEmployee}
          className={classes.formStye}
          onError={(errors) => console.log(errors)}
        >
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

              <TextValidator
                label="Email"
                variant="outlined"
                onChange={handleInputChange}
                name="email"
                value={values.email}
                size="small"
                validators={["required", "isEmail"]}
                errorMessages={["this field is required", "email is not valid"]}
              />

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
                InputProps={{
                  inputProps: { min: "", max: date },
                }}
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

                <Button type="submit" variant="contained">
                  Create
                </Button>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <TextValidator
                label="CNIC Number"
                variant="outlined"
                onChange={handleInputChange}
                name="cnicnumber"
                value={values.cnicnumber}
                size="small"
                inputProps={{ maxLength: 13 }}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />

              <TextValidator
                variant="outlined"
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                size="small"
                inputProps={{ maxLength: 11 }}
                onChange={handleInputChange}
                value={values.phoneNumber}
                validators={["required"]}
                errorMessages={["this field is required"]}
              ></TextValidator>

              <TextField
                variant="outlined"
                label="Emergency Number"
                name="emergencyNumber"
                type="tel"
                size="small"
                inputProps={{ maxLength: 11 }}
                onChange={handleInputChange}
                value={values.emergencyNumber}
              ></TextField>

              <TextField
                variant="outlined"
                label="Mobile Number"
                name="mobileNumber"
                type="tel"
                size="small"
                inputProps={{ maxLength: 11 }}
                onChange={handleInputChange}
                value={values.mobileNumber}
              ></TextField>

              <TextField
                variant="outlined"
                label="Guardian Number"
                type="tel"
                name="guardianNumber"
                size="small"
                inputProps={{ maxLength: 11 }}
                onChange={handleInputChange}
                value={values.guardianNumber}
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
                type="number"
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
        </ValidatorForm>
      </Paper>
    </div>
  );
}
