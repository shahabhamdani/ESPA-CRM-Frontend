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
export default function CreateUser() {
  const classes = useStyles();
  let history = useHistory();

  const date = new Date().toLocaleDateString() + "";

  const initialFValues = {
    id: "",
    UserName: "",
    Password: "",

    BranchID: "",
    CompanyID: "",
    UserRolesID: "",

    EnteredBy: "",
    EnteredOn: "" + date,
    Active: "",
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
    const result = await api.get("/userRoles");
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
                name="UserName"
                onChange={handleInputChange}
                size="small"
                value={values.UserName}
              ></TextField>
              <TextField
                variant="outlined"
                label="Password"
                name="Password"
                onChange={handleInputChange}
                size="small"
                value={values.Password}
              ></TextField>

              <FormControl
                size="small"
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="UserRolesID">Role</InputLabel>
                <Select
                  name="UserRolesID"
                  value={values.UserRolesID}
                  size="small"
                  onChange={handleInputChange}
                  label="Role"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {userRoles.map((role) => {
                    return <MenuItem value={role.id}>{role.UserRole}</MenuItem>;
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
