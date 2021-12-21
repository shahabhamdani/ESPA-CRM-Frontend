import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

export default function CreateUser() {
  const classes = useStyles();
  let history = useHistory();

  var userData = JSON.parse(localStorage.getItem("user-info"));

  const temp = new Date().toLocaleDateString() + "";
  const date = moment(temp.BeginDate_1).format("YYYY-MM-DD");

  const { id } = useParams();

  const initialFValues = {
    userName: "",
    password: "",
    employeeId: id,
    branchId: 0,
    companyId: 0,
    userRolesId: 0,
    enteredBy: "" + userData.userName,
    enteredOn: date,
    active: "Y",
  };

  const [values, setValues] = useState(initialFValues);
  const [companies, setCompany] = useState([]);
  const [branches, setBranches] = useState([]);
  const [userRoles, setUserRoles] = useState([]);

  const loadCompanies = async () => {
    const result = await api.get("/company");
    setCompany(result.data);
  };

  const loadBranches = async () => {
    const result = await api.get("/branches");
    setBranches(result.data);
  };

  const loadUserRoles = async () => {
    const result = await api.get("/roles");
    setUserRoles(result.data);
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

  const createUser = async () => {
    const response = await api.post("/users", request);
    alert("" + response.statusText);
    history.push("/employee");
  };

  useEffect(() => {
    loadCompanies();
    loadBranches();
    loadUserRoles();
  }, []);

  return (
    <div>
      <PageHeader label="User" pageTitle="Add User" />

      <Paper className={classes.pageContent}>
        <form className={classes.formStye}>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="User Name"
                name="userName"
                onChange={handleInputChange}
                size="small"
                value={values.userName}
              ></TextField>
              <TextField
                variant="outlined"
                label="Password"
                name="password"
                onChange={handleInputChange}
                size="small"
                value={values.password}
              ></TextField>

              <FormControl
                size="small"
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="userRolesId">Role</InputLabel>
                <Select
                  name="userRolesId"
                  value={values.userRolesId}
                  size="small"
                  onChange={handleInputChange}
                  label="Role"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {userRoles.map((role) => {
                    return (
                      <MenuItem value={role.userRolesId}>
                        {role.userRole}
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
                <Button
                  Style="margin-top:30px;"
                  variant="contained"
                  onClick={createUser}
                >
                  Create
                </Button>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
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
                <InputLabel id="branchId">Branch</InputLabel>
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

              <TextField
                disabled
                label="Entered On"
                size="small"
                variant="outlined"
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
        </form>
      </Paper>
    </div>
  );
}
