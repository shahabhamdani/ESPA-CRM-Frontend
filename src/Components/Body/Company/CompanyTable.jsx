import React, { useState, useEffect } from "react";
import axios from "axios";
import { PageHeader } from "../../Common/CommonComponent";
import Table from "material-table";
import { Button, Modal, Typography } from "@material-ui/core";
import { useStyles } from "../BodyStyles";
import { Box } from "@mui/system";
import api from "../../Api/Api";
import { useHistory } from "react-router";
import UpdateCompany from "./UpdateCompany";

export default function CompanyTable() {
  let history = useHistory();
  const tableRef = React.createRef();
  const classes = useStyles();
  const columns = [
    { title: "ID", field: "companyId" },
    { title: "CompanyName", field: "companyName" },
    { title: "CompanyLogo", field: "companyLogo" },
    { title: "Active", field: "active" },
    {
      title: "",
      field: "internal_action",
      editable: false,
    },
  ];

  const [companies, setCompany] = useState([]);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    const result = await api.get("/company");
    setCompany(result.data);
  };

  const deleteCompany = async (id) => {
    const result = await api.delete("/company/" + id);
    loadCompanies();
  };

  return (
    <div>
      <Box className={classes.tableLayout}>
        <Table
          title="Company"
          data={companies}
          columns={columns}
          tableRef={tableRef}
          actions={[
            {
              icon: "delete",

              tooltip: "Delete Company",
              onClick: (event, rowData) => {
                deleteCompany(rowData.companyId);
              },
            },

            {
              icon: "edit",
              tooltip: "Edit Company",

              onClick: (event, rowData) => {
                history.push("/company/update/" + rowData.companyId);
              },
            },
            {
              icon: "visibility",
              tooltip: "View Company",
              onClick: (event, rowData) => {
                  history.push("/company/view/" + rowData.companyId);
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
