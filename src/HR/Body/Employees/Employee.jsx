import React, { useState, useEffect } from "react";

import { useHistory, useParams } from "react-router";
import axios from "axios";
import { PageHeader } from "../../Common/CommonComponent";
import Table from "material-table";
import Button from "@mui/material/Button";
import { useStyles } from "../BodyStyles";
import { Box } from "@mui/system";
import { Modal } from "@material-ui/core";
import api from "../../Api/Api";
import EmployeeTable from "./EmployeeTable";

export default function Employee() {
  const classes = useStyles();

  let history = useHistory();
  const openCreateEmployeeForm = () => history.push("/employee/create");

  const loadEmployee = async (id) => {
    const response = await api.get("/employee/" + { id });
  };

  return (
    <>
      <Box>
        <PageHeader label="Employee" pageTitle="Overview" />
      </Box>

      <div className={classes.crudGrid}>
        <Box>
          <Button variant="contained" onClick={openCreateEmployeeForm}>
            Add Employee
          </Button>

          <EmployeeTable />
        </Box>
      </div>
    </>
  );
}
