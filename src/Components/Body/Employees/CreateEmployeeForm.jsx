import React, { useState, useEffect } from "react";
import axios from "axios";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Btn from "@material-ui/core/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
  IconButton,
  Icon,
} from "@material-ui/core";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { useHistory } from "react-router";
import { PageHeader } from "../../Common/CommonComponent";
import Button from "@mui/material/Button";
import { useStyles } from "../BodyStyles";
import api from "../../Api/Api";
import * as moment from "moment";

export default function CreateEmployeeForm() {
  const classes = useStyles();
  let history = useHistory();

  var userData = JSON.parse(localStorage.getItem("user-info"));

  const temp = new Date().toLocaleDateString();

  const date = moment(temp.BeginDate_1).format("YYYY-MM-DD");

  const initialFValues = {
    firstName: "",
    lastName: "",
    email: "",
    officialEmail: "",
    phoneNumber: "",
    companyId: 1,
    branchId: 1,
    enteredBy: "" + userData.userName,
    enteredOn: date,
    address: "",
    guardianRelation: "",
    guardianName: "",
    dateOfBirth: "",
    gender: "male",
    mobileNumber: "",
    cnicnumber: "",
    employeeImage: "",
    employeeCode: "",
    employeeNtn: "",
    bankAccountNumber: "",
    bankAccountTitle: "",
    bankName: "",
    active: "Y",
    cnicFile: "",
    employmentLetterFile: "",
    securityChequeFile: "",
    emergencyNumber: "",
    guardianCnicFile: "",
    guardianNumber: "",
  };

  const [SecurityCheckBtnName, setSecurityChequeBtnName] = useState("");
  const [empLetterBtnName, setEmpLetterBtnName] = useState("");
  const [guardianCnicBtnName, setGuardianCnicBtnName] = useState("");

  const [cnicBtnName, setCnicBtnName] = useState("");

  const [file, setFile] = useState([]);

  const [values, setValues] = useState(initialFValues);
  const [companies, setCompany] = useState([]);
  const [branches, setBranches] = useState([]);

  const [diagOpen, setDiagOpen] = React.useState(false);

  const handleDiagClickOpen = () => {
    setDiagOpen(true);
  };

  const handleDiagClickClose = () => {
    setDiagOpen(false);
  };

  const handleDiagClickAgree = () => {
    setDiagOpen(false);
    createEmployee();
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
  const [guardianCnic, setGuardianCnic] = useState();

  const [SecCheque, setSecCheque] = useState();
  const [cnic, setCnic] = useState();

  const [SecChequeColor, setSecChequeColor] = useState("inherit");
  const [guardianCnicColor, setGuardianCnicColor] = useState("inherit");

  const [empLetterColor, setEmpLetterColor] = useState("inherit");
  const [cnicColor, setCnicColor] = useState("inherit");

  const [fileName, setFileName] = useState("");

  const securityChequeChangeHandler = (event) => {
    setSecCheque(event.target.files[0]);
    setSecChequeColor("primary");
    setSecurityChequeBtnName(event.target.files[0].name);
  };

  const empLetterChangeHandler = (event) => {
    setEmpLetter(event.target.files[0]);
    setEmpLetterColor("primary");
    setEmpLetterBtnName(event.target.files[0].name);
  };

  const guardianCnicChangeHandler = (event) => {
    setGuardianCnic(event.target.files[0]);
    setGuardianCnicColor("primary");
    setGuardianCnicBtnName(event.target.files[0].name);
  };

  const cnicChangeHandler = (event) => {
    setCnic(event.target.files[0]);
    setCnicColor("primary");
    setCnicBtnName(event.target.files[0].name);
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
    //var formData = new FormData();

    if (cnic == null) {
      alert("Please Attach Cnic");
    } else if (SecCheque == null) {
      alert("Please Attach Security Cheque");
    } else if (empLetter == null) {
      alert("Please Attach Employment Letter");
    } else if (guardianCnic == null) {
      alert("Please Attach Guardian CNIC");
    } else {
      var imagefile = file;

      request.employeeImage = "dp_" + values.cnicnumber;
      request.cnicFile = values.cnicnumber + cnic.name;
      request.employmentLetterFile = values.cnicnumber + empLetter.name;
      request.securityChequeFile = values.cnicnumber + SecCheque.name;
      request.guardianCnicFile = values.cnicnumber + guardianCnic.name;

      // formData.append("files", imagefile);
      //formData.append("id", "" + values.cnicnumber);
      /*
    api.post("/imageupload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });*/

      putMultipleFiles(
        {
          f: cnic,
        },
        {
          f: empLetter,
        },
        {
          f: SecCheque,
        },
        {
          f: guardianCnic,
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

      if (imagefile != null) {
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
      }

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
    }
  };

  useEffect(() => {
    loadCompanies();
    loadBranches();
  }, []);

  return (
    <div>
      <PageHeader label="Employee" pageTitle="Add Employee" />

      <Dialog
        open={diagOpen}
        onClose={handleDiagClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Create Employee"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDiagClickClose}>Disagree</Button>
          <Button onClick={handleDiagClickAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <div Style="padding:10px; display: flex;">
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

        <input
          accept="file/*"
          className={classes.uploadImage}
          id="guardianCnic"
          type="file"
          onChange={guardianCnicChangeHandler}
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
            Style="margin:5px;     display: block;"
            color={SecChequeColor}
            className={classes.filesUploadDiv}
            startIcon={<CloudUploadIcon />}
            component="span"
          >
            Security Cheque {SecurityCheckBtnName}
          </Button>
        </label>

        <label htmlFor="empLetter">
          <Button
            variant="contained"
            Style="margin:5px;     display: block;"
            size="small"
            color={empLetterColor}
            className={classes.filesUploadDiv}
            startIcon={<CloudUploadIcon />}
            component="span"
          >
            Employment Letter {empLetterBtnName}
          </Button>
        </label>

        <label htmlFor="cnic">
          <Button
            variant="contained"
            size="small"
            color={cnicColor}
            className={classes.filesUploadDiv}
            Style="margin:5px;     display: block;"
            startIcon={<CloudUploadIcon />}
            component="span"
          >
            CNIC {cnicBtnName}
          </Button>
        </label>

        <label htmlFor="guardianCnic">
          <Button
            variant="contained"
            size="small"
            color={guardianCnicColor}
            className={classes.filesUploadDiv}
            Style="margin:5px;     display: block;"
            startIcon={<CloudUploadIcon />}
            component="span"
          >
            Guardian CNIC {guardianCnicBtnName}
          </Button>
        </label>
      </div>

      <Paper className={classes.pageContent}>
        <ValidatorForm
          onSubmit={handleDiagClickOpen}
          className={classes.formStye}
          onError={(errors) => console.log(errors)}
        >
          <Grid container>
            <Grid item xs={12}></Grid>
            <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                label="First Name"
                name="firstName"
                onChange={handleInputChange}
                size="small"
                value={values.firstName}
                validators={["required"]}
                errorMessages={["this field is required"]}
              ></TextValidator>

              <TextValidator
                variant="outlined"
                label="Last Name"
                name="lastName"
                onChange={handleInputChange}
                size="small"
                value={values.lastName}
                validators={["required"]}
                errorMessages={["this field is required"]}
              ></TextValidator>

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

              <TextValidator
                label="Official Email"
                variant="outlined"
                onChange={handleInputChange}
                name="officialEmail"
                value={values.officialEmail}
                size="small"
                validators={["required", "isEmail"]}
                errorMessages={["this field is required", "email is not valid"]}
              />

              <TextValidator
                variant="outlined"
                label="Address"
                name="address"
                onChange={handleInputChange}
                size="small"
                multiline
                rows={4}
                value={values.address}
                validators={["required"]}
                errorMessages={["this field is required"]}
              ></TextValidator>

              <TextField
                variant="outlined"
                label="Guardian Name"
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
                label="Date Of Birth"
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
                    value="Male"
                    control={<Radio />}
                    label="Male"
                    Active
                  />
                  <FormControlLabel
                    value="Female"
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
                label="Primary Mobile Number"
                name="phoneNumber"
                type="tel"
                size="small"
                inputProps={{ maxLength: 11 }}
                onChange={handleInputChange}
                value={values.phoneNumber}
                validators={["required", "isNumber"]}
                errorMessages={[
                  "this field is required",
                  "number is not valid",
                ]}
              ></TextValidator>

              <TextValidator
                variant="outlined"
                label="Secondary Mobile Number"
                name="mobileNumber"
                type="tel"
                size="small"
                inputProps={{ maxLength: 11 }}
                onChange={handleInputChange}
                value={values.mobileNumber}
                validators={["required", "isNumber"]}
                errorMessages={[
                  "this field is required",
                  "number is not valid",
                ]}
              ></TextValidator>

              <TextValidator
                variant="outlined"
                label="Emergency Number"
                name="emergencyNumber"
                type="tel"
                size="small"
                inputProps={{ maxLength: 11 }}
                onChange={handleInputChange}
                value={values.emergencyNumber}
                validators={["required", "isNumber"]}
                errorMessages={[
                  "this field is required",
                  "number is not valid",
                ]}
              ></TextValidator>

              <TextValidator
                variant="outlined"
                label="Guardian Number"
                type="tel"
                name="guardianNumber"
                size="small"
                inputProps={{ maxLength: 11 }}
                onChange={handleInputChange}
                value={values.guardianNumber}
                validators={["required", "isNumber"]}
                errorMessages={[
                  "this field is required",
                  "number is not valid",
                ]}
              ></TextValidator>

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
                label="Bank Account Title"
                name="bankAccountTitle"
                onChange={handleInputChange}
                size="small"
                value={values.bankAccountTitle}
              ></TextField>

              <TextField
                variant="outlined"
                label="Bank Account Number"
                name="bankAccountNumber"
                size="small"
                type="number"
                inputProps={{ maxLength: 100 }}
                onChange={handleInputChange}
                value={values.bankAccountNumber}
              ></TextField>

              <TextField
                variant="outlined"
                label="Bank Name"
                name="bankName"
                size="small"
                onChange={handleInputChange}
                value={values.bankName}
              ></TextField>

              <TextField
                disabled
                label="Entered On"
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
                disabled
                variant="outlined"
                label="Entered By"
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
