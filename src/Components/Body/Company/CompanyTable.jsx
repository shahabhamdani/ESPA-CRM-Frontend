import React, { useState, useEffect } from "react";
import axios from "axios";
import { PageHeader } from "../../Common/CommonComponent";
import Table from "material-table";
import { Button, Modal, Typography } from "@material-ui/core";
import { useStyles } from "../BodyStyles";
import { Box } from "@mui/system";
import CompanyForm from "./CompanyForm";
import api from "../../Api/Api";

export default function CompanyTable() {
  const tableRef = React.createRef();
  const classes = useStyles();
  const columns = [
    { title: "ID", field: "id" },
    { title: "CompanyName", field: "CompanyName" },
    { title: "CompanyLogo", field: "CompanyLogo" },
    { title: "Active", field: "Active" },

    {
      title: "",
      field: "internal_action",
      editable: false,
      render: (rowData) =>
        rowData && (
          <div className={classes.editDeleteButtonsDiv}>
            <Button
              className={classes.tblButtonDelete}
              variant="outlined"
              onClick={() => alert("You Deleted " + rowData.id)}
            >
              Delete
            </Button>

            <Button
              className={classes.tblButtonEdit}
              variant="outlined"
              onClick={() => alert("You edited " + rowData.id)}
            >
              Edit
            </Button>
          </div>
        ),
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

  return (
    <div>
      <Box className={classes.tableLayout}>
        <Table
          title="Company"
          data={companies}
          columns={columns}
          tableRef={tableRef}
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
