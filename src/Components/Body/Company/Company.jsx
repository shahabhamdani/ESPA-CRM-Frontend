import React, { useState, useEffect } from "react";
import axios from "axios";
import { PageHeader } from "../../Common/CommonComponent";
import { Paper, TableBody, TableCell, TableRow } from "@material-ui/core";
import useTable from "../../Common/useTable";

const headCells = [
  { id: "id", label: "Company ID" },
  { id: "companyName", label: "Company Name" },
  { id: "companyLogo", label: "Company Logo" },
  { id: "active", label: "Active" },
];

export default function Company() {
  const [companies, setCompany] = useState([]);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    const result = await axios.get("http://localhost:3003/company");
    setCompany(result.data);
  };

  const { tblContainer, tblHead } = useTable(companies, headCells);

  return (
    <>
      <PageHeader label="Company" pageTitle="Manage" />

      <Paper>
        <tblContainer>
          <tblHead />
          <TableBody>
            {companies.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.CompanyName}</TableCell>
                <TableCell>{item.CompanyLogo}</TableCell>
                <TableCell>{item.Active}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </tblContainer>
      </Paper>
    </>
  );
}
