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
import BranchesTable from "./BranchesTable";

export default function Branches() {
  const classes = useStyles();

  let history = useHistory();
  const openCreateBranchForm = () => history.push("/branches/create");

  const loadBranches = async (id) => {
    const response = await api.get("/branches/" + { id });
  };

  return (
    <>
      <Box>
        <PageHeader label="Branches" pageTitle="Overview" />
      </Box>

      <div className={classes.crudGrid}>
        <Box>
          <Button variant="contained" onClick={openCreateBranchForm}>
            Add Branch
          </Button>
        </Box>

        <BranchesTable />
      </div>
    </>
  );
}
