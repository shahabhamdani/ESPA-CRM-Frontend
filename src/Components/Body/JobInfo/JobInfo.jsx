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
import * as moment from "moment";

export default function JobInfo() {
  const classes = useStyles();
  let history = useHistory();

  const tableRef = React.createRef();

  const temp = new Date().toLocaleDateString() + "";
  const date = moment(temp.BeginDate_1).format("YYYY-MM-DD");

  const { id } = useParams();

  const columns = [
    { title: "ID", field: "jodInfoId" },
    { title: "JoiningDate", field: "joiningDate" },
    { title: "Salary", field: "salary" },
    { title: "JobType", field: "jobType" },
    { title: "ExpiryDate", field: "expiryDate" },
    { title: "EnteredBy", field: "enteredBy" },
    { title: "EnteredOn", field: "enteredOn" },
    { title: "Active", field: "active" },
    { title: "DesignationID", field: "designationId" },
    { title: "DepartmentID", field: "departmentId" },
    { title: "CompanyID", field: "companyId" },
    { title: "BranchID", field: "branchId" },
    { title: "EmployeeID", field: "employeeId" },
  ];

  const initialFValues = {
    jodInfoId: 0,
    joiningDate: "",
    salary: 0,
    jobType: "",
    expiryDate: "0000-00-00",
    enteredBy: "",
    enteredOn: date,
    active: "",
    designationId: 0,
    departmentId: 0,
    companyId: 0,
    branchId: 0,
    employeeId: id,
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

  const loadSingleJobInfo = async (id) => {
    const result = await api.get("/jobInfo/" + id);
    setValues(result.data);
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
    request.joiningDate = moment(request.joiningDate.BeginDate_1).format(
      "YYYY-MM-DD"
    );
    request.expiryDate = moment(request.expiryDate.BeginDate_1).format(
      "YYYY-MM-DD"
    );
    request.enteredOn = moment(request.enteredOn.BeginDate_1).format(
      "YYYY-MM-DD"
    );
    request.salary = parseInt(request.salary);
    request.employeeId = parseInt(request.employeeId);
    const response = await api.post("/jobInfo", request);
    alert("" + response.statusText);
    history.push("/employee");
  };

  const updateJobInfo = async () => {
    const response = await api.put("/jobInfo/", request);
    setValues(initialFValues);
    loadJobInfo();
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
                InputProps={{
                  inputProps: { min: "", max: date },
                }}
                name="joiningDate"
                onChange={handleInputChange}
                value={values.joiningDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                variant="outlined"
                label="salary"
                type="number"
                name="salary"
                onChange={handleInputChange}
                size="small"
                value={values.salary}
              ></TextField>

              <FormControl
                size="small"
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="DepartmentID">Department</InputLabel>
                <Select
                  name="departmentId"
                  value={values.departmentId}
                  size="small"
                  onChange={handleInputChange}
                  label="Department"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {departments.map((department) => {
                    return (
                      <MenuItem value={department.departmentId}>
                        {department.departmentName}
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
                <InputLabel id="designationId">Designation</InputLabel>
                <Select
                  name="designationId"
                  value={values.designationId}
                  size="small"
                  onChange={handleInputChange}
                  label="Designation"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {designations.map((designation) => {
                    return (
                      <MenuItem value={designation.designationId}>
                        {designation.designationName}
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
                  name="jobType"
                  value={values.jobType}
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
                  name="active"
                  onChange={handleInputChange}
                  value={values.active}
                >
                  <FormControlLabel value="Y" control={<Radio />} label="Yes" />
                  <FormControlLabel value="N" control={<Radio />} label="No" />
                </RadioGroup>

                <div>
                  <Button
                    Style=" width:150px; margin-top:30px; margin:5px;"
                    variant="contained"
                    onClick={createJobInfo}
                  >
                    Create
                  </Button>

                  <Button
                    Style=" color:white; background-color:green; width:150px; margin-top:30px; margin:5px;"
                    variant="outlined"
                    onClick={updateJobInfo}
                  >
                    Update
                  </Button>
                </div>
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
                deleteJobInfo(rowData.jodInfoId);
              },
            },

            {
              icon: "edit",
              tooltip: "Edit Company",

              onClick: (event, rowData) => {
                loadSingleJobInfo(rowData.jodInfoId);
              },
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
