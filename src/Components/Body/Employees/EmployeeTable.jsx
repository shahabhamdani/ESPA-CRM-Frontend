import React, { useState, useEffect } from "react";
import axios from "axios";
import { PageHeader } from "../../Common/CommonComponent";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Table from "material-table";
import WorkIcon from "@material-ui/icons/Work";
import {
  Button,
  Modal,
  Paper,
  Typography,
  IconButton,
} from "@material-ui/core";
import { useStyles } from "../BodyStyles";
import { Box } from "@mui/system";
import api from "../../Api/Api";
import { useHistory } from "react-router";

export default function EmployeeTable() {
  let history = useHistory();
  const tableRef = React.createRef();
  const classes = useStyles();

  /*
    { title: "PhoneNumber", field: "PhoneNumber" },
    { title: "CompanyID", field: "CompanyID" },
    { title: "EnteredBy", field: "EnteredBy" },
    { title: "EnteredOn", field: "EnteredOn" },
    { title: "Address", field: "Address" },
    { title: "BranchID", field: "BranchID" },
    { title: "GuardianRelation", field: "GuardianRelation" },
    { title: "GuardianName", field: "GuardianName" },
    { title: "DateOfBirth", field: "DateOfBirth" },
    { title: "Gender", field: "Gender" },
    { title: "MobileNumber", field: "MobileNumber" },
    { title: "CNICNumber", field: "CNICNumber" },
    { title: "EmployeeNTN", field: "EmployeeNTN" },
    { title: "BankAccountTitle", field: "BankAccountTitle" },
    { title: "BankAccountNumber", field: "BankAccountNumber" },
    { title: "BankName", field: "BankName" },
    { title: "Active", field: "Active" },
    { title: "EmployeeImage", field: "EmployeeImage" },*/

  const columns = [
    {
      title: "User",
      field: "internal_action",
      editable: false,
      render: (rowData) =>
        rowData && (
          <div Style="display: inline-flex;">
            <IconButton
              fontSize="small"
              color="inherit"
              onClick={() => {
                history.push("/user/create/" + rowData.employeeId);
              }}
            >
              <VpnKeyIcon />
            </IconButton>
          </div>
        ),
    },
    { title: "ID", field: "employeeId" },

    { title: "FirstName", field: "firstName" },
    { title: "LastName", field: "lastName" },
    { title: "Email", field: "email" },

    { title: "EmployeeCode", field: "employeeCode" },
  ];

  const [employee, setEmployee] = useState([]);

  const loadEmployee = async () => {
    const result = await api.get("/employee");
    setEmployee(result.data);
  };

  const deleteEmployee = async (id) => {
    const result = await api.delete("/employee/" + id);
    loadEmployee();
  };

  const addJobInfo = async (id) => {
    history.push("/employee/JobInfo/" + id);
  };

  useEffect(() => {
    loadEmployee();
  }, []);
  return (
    <div>
      <Box className={classes.tableLayout}>
        <Table
          title="Employee"
          data={employee}
          columns={columns}
          tableRef={tableRef}
          actions={[
            /* {
              icon: "delete",

              tooltip: "Delete Employee",
              onClick: (event, rowData) => {
                deleteEmployee(rowData.id);
              },
            },*/

            {
              icon: "visibility ",
              tooltip: "View Employee",
              onClick: (event, rowData) => {
                history.push("/employee/view/" + rowData.employeeId);
              },
            },

            {
              icon: "edit",
              tooltip: "Edit Employee",

              onClick: (event, rowData) => {
                history.push("/employee/update/" + rowData.employeeId);
              },
            },

            {
              icon: "work",

              tooltip: "Job info",
              onClick: (event, rowData) => {
                addJobInfo(rowData.employeeId);
              },
            },
          ]}
          options={{
            actionsColumnIndex: -1,
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
