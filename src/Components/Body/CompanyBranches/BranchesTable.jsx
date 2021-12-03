import React, { useState, useEffect } from "react";
import axios from "axios";
import { PageHeader } from "../../Common/CommonComponent";
import Table from "material-table";
import { Button, Modal, Paper, Typography } from "@material-ui/core";
import { useStyles } from "../BodyStyles";
import { Box } from "@mui/system";
import api from "../../Api/Api";
import { useHistory } from "react-router";
export default function BranchesTable() {
  let history = useHistory();
  const tableRef = React.createRef();
  const classes = useStyles();

  const columns = [
    { title: "ID", field: "branchId" },
    { title: "BranchName", field: "branchName" },
    { title: "BranchEmail", field: "branchEmail" },
    { title: "LandLineNumber", field: "landLineNumber" },
    { title: "Active", field: "active" },
    {
      title: "",
      field: "internal_action",
      editable: false,
    },
  ];

  const [branches, setBranches] = useState([]);

  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    const result = await api.get("/branches");
    setBranches(result.data);
  };

  const deleteBranch = async (id) => {
    const result = await api.delete("/branches/" + id);
    loadBranches();
  };
  return (
    <div>
      <Box className={classes.tableLayout}>
        <Table
          title="Branches"
          data={branches}
          columns={columns}
          tableRef={tableRef}
          actions={[
            {
              icon: "delete",

              tooltip: "Delete Branch",
              onClick: (event, rowData) => {
                deleteBranch(rowData.branchId);
              },
            },

            {
              icon: "edit",
              tooltip: "Edit Branch",

              onClick: (event, rowData) => {
                history.push("/branches/update/" + rowData.branchId);
              },
            },
            {
              icon: "visibility",
              tooltip: "View Branch",
              onClick: (event, rowData) => {
                history.push("/branches/view/" + rowData.branchId);
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
