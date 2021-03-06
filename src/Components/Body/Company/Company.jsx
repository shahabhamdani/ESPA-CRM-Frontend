import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Paper,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import { PageHeader } from "../../Common/CommonComponent";
import Table from "material-table";
import Button from "@mui/material/Button";
import { useStyles } from "../BodyStyles";
import { Box } from "@mui/system";
import CompanyTable from "./CompanyTable";
import { Modal } from "@material-ui/core";
import api from "../../Api/Api";
import CreateCompany from "./CreateCompany";

export default function Company() {
  const classes = useStyles();

  let history = useHistory();
  const openAddCompanyForm = () => history.push("/company/create");

  const loadCompany = async (id) => {
    const response = await api.get("/company/" + { id });
  };

  return (
    <>
      <PageHeader label="Company" pageTitle="Manage" />

      <div className={classes.crudGrid}>
        <Box>
          <Button variant="contained" onClick={openAddCompanyForm}>
            Add Company
          </Button>
        </Box>
      </div>

      <CompanyTable />
    </>
  );
}
