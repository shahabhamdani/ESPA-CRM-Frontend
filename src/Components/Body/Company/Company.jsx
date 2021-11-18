import React, { useState, useEffect } from "react";
import axios from "axios";
import { PageHeader } from "../../Common/CommonComponent";
import Table from "material-table";
import Button from "@mui/material/Button";
import { useStyles } from "../BodyStyles";
import { Box } from "@mui/system";
import CompanyTable from "./CompanyTable";
import { Modal, Paper } from "@material-ui/core";
import CompanyForm from "./CompanyForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  border: "2px solid #000",
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
};

export default function Company() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <PageHeader label="Company" pageTitle="Manage" />

      <div className={classes.crudGrid}>
        <Box>
          <Button variant="contained" onClick={handleOpen}>
            Add Company
          </Button>
        </Box>
      </div>

      <CompanyTable />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{<CompanyForm />}</Box>
      </Modal>
    </>
  );
}
