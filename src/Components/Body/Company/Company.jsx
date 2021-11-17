import React, { useState, useEffect } from "react";
import axios from "axios";
import { PageHeader } from "../../Common/CommonComponent";
import { Paper, TableBody, TableCell, TableRow } from "@material-ui/core";
import useTable from "../../Common/useTable";

export default function Company() {
  const TableContainer = useTable();

  const [companies, setCompany] = useState([]);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    const result = await axios.get("http://localhost:3003/company");
    setCompany(result.data);
  };

  return (
    <>
      <PageHeader label="Company" pageTitle="Manage" />

      <Paper variant="outlined">
        <TableContainer>
          <TableBody>
            {companies.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.CompanyName}</TableCell>
                <TableCell>{item.CompanyLogo}</TableCell>
                <TableCell>{item.Active}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>
      </Paper>
    </>
  );
}
