import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "material-table";
import { Box } from "@mui/system";

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

export default function JobInfo() {
  const classes = useStyles();
  let history = useHistory();

  const tableRef = React.createRef();

  const date = new Date().toLocaleDateString() + "";

  const { id } = useParams();

  const columns = [
    { title: "ID", field: "id" },
    { title: "JoiningDate", field: "JoiningDate" },
    { title: "Salary", field: "Salary" },
    { title: "JobType", field: "JobType" },
    { title: "ExpiryDate", field: "ExpiryDate" },
    { title: "EnteredBy", field: "EnteredBy" },
    { title: "EnteredOn", field: "EnteredOn" },
    { title: "Active", field: "Active" },
    { title: "DesignationID", field: "DesignationID" },
    { title: "DepartmentID", field: "DepartmentID" },
    { title: "CompanyID", field: "CompanyID" },
    { title: "BranchID", field: "BranchID" },
    { title: "EmployeeID", field: "EmployeeID" },
  ];

  const initialFValues = {
    id: "",
    JoiningDate: "",
    Salary: "",
    JobType: "",
    ExpiryDate: "",
    EnteredBy: "",
    EnteredOn: "" + date,
    Active: "",
    DesignationID: "",
    DepartmentID: "",
    CompanyID: "",
    BranchID: "",
    EmployeeID: "" + id,
  };

  const [values, setValues] = useState(initialFValues);
  const [companies, setCompany] = useState([]);
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  const [jobInfo, setJobInfo] = useState([]);

  //Will be changes after adding backend [CCC01]
  const loadJobInfo = async () => {
    const result = await api.get("/jobInfo");
    setJobInfo(result.data);
  };

  const loadCompanies = async () => {
    const result = await api.get("/company");
    setCompany(result.data);
  };

  const loadBranches = async () => {
    const result = await api.get("/branches");
    setBranches(result.data);
  };

  const loadDepartments = async () => {
    const result = await api.get("/department");
    setDepartments(result.data);
  };
  const loadDesignations = async () => {
    const result = await api.get("/designation");
    setDesignations(result.data);
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

  const deleteJobInfo = async (id) => {
    const result = await api.delete("/jobInfo/" + id);
    alert(result.statusText + "");
    loadJobInfo();
  };

  const createJobInfo = async () => {
    const response = await api.post("/jobInfo", request);
    alert("" + response.statusText);
    history.push("/employee");
  };

  useEffect(() => {
    loadCompanies();
    loadBranches();
    loadDepartments();
    loadDesignations();
    loadJobInfo();
  }, []);

  return (
    <div>
      <PageHeader label="Employee" pageTitle="Job Information" />

      <Paper className={classes.pageContent}>
        <form className={classes.formStye}>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                label="JoiningDate"
                size="small"
                type="date"
                variant="outlined"
                name="JoiningDate"
                onChange={handleInputChange}
                value={values.JoiningDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                variant="outlined"
                label="salary"
                type="number"
                name="Salary"
                onChange={handleInputChange}
                size="small"
                value={values.Salary}
              ></TextField>

              <FormControl
                size="small"
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="DepartmentID">Department</InputLabel>
                <Select
                  name="DepartmentID"
                  value={values.DepartmentID}
                  size="small"
                  onChange={handleInputChange}
                  label="Department"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {departments.map((department) => {
                    return (
                      <MenuItem value={department.id}>
                        {department.DepartmentName}
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
                <InputLabel id="DesignationID">Designation</InputLabel>
                <Select
                  name="DesignationID"
                  value={values.DesignationID}
                  size="small"
                  onChange={handleInputChange}
                  label="Designation"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {designations.map((designation) => {
                    return (
                      <MenuItem value={designation.id}>
                        {designation.DesignationName}
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
                <InputLabel id="JobType">JobType</InputLabel>
                <Select
                  name="JobType"
                  value={values.JobType}
                  size="small"
                  onChange={handleInputChange}
                  label="Job Type"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  <MenuItem value="FullTime">Full Time</MenuItem>
                  <MenuItem value="PartTime">Part Time</MenuItem>
                  <MenuItem value="Remote">Remote</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
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
                  onClick={createJobInfo}
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

      <Box className={classes.tableLayout}>
        <Table
          title="JobInfo"
          data={jobInfo}
          columns={columns}
          tableRef={tableRef}
          actions={[
            {
              icon: "delete",

              tooltip: "Delete Jobinfo",
              onClick: (event, rowData) => {
                deleteJobInfo(rowData.id);
              },
            },

            {
              icon: "edit",
              tooltip: "Edit Company",

              onClick: (event, rowData) => {},
            },
          ]}
          options={{
            padding: 0,
            headerStyle: {
              fontSize: 15,
            },
            rowStyle: {
              fontSize: 15,
            },

            //search: false,
          }}
        />
      </Box>
    </div>
  );
}
