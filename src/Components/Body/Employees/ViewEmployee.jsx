import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../Api/Api";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Button from "@mui/material/Button";
import { Grid, IconButton, List, ListItem } from "@material-ui/core";
import { useHistory } from "react-router";
import { PageHeader } from "../../Common/CommonComponent";
import { Box } from "@mui/system";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import download from "downloadjs";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    height: "80%",
    width: "96%",

    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 0, 0),
  },
}));

const initialFValues = {
  employeeId: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  companyId: 1,
  branchId: 1,
  enteredBy: "",
  enteredOn: "",
  address: "",
  guardianRelation: "",
  guardianName: "",
  dateOfBirth: "",
  gender: "male",
  mobileNumber: "",
  cnicnumber: "",
  employeeImage: "",
  employeeCode: "",
  employeeNtn: "",
  bankAccountNumber: "",
  bankAccountTitle: "",
  bankName: "",
  active: "Y",
  cnicFile: "",
  employmentLetterFile: "",
  securityChequeFile: "",
  emergencyNumber: "",
  guardianCnicFile: "",
  guardianNumber: "",
};

export default function ViewEmployee() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function getModalStyle() {
    const top = 13;
    const left = 14;
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const [modalStyle] = React.useState(getModalStyle);

  let history = useHistory();
  const [values, setValues] = useState(initialFValues);

  const [pdfFile, setPdfFile] = useState();
  const [text, setText] = useState();

  const loadEmployee = async () => {
    const result = await api.get("/employee/" + id);
    setValues(result.data);
  };
  const { id } = useParams();
  useEffect(() => {
    loadEmployee();
  }, []);

  const downloadFile = (temp) => {
    fetch(
      "https://ozurb6ve12.execute-api.ap-south-1.amazonaws.com/dev/espa-crm-files/" +
        temp,
      {
        headers: {
          "Content-Type": "image/pdf",
        },
      }
    )
      .then((response) => response.blob())
      .then((res) => {
        // Then create a local URL for that image and print it
        //download(res, temp, "image/*");

        var file = new Blob([res], { type: "application/pdf" });
        var fileURL = URL.createObjectURL(file);
        setPdfFile(fileURL);

        handleOpen();
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <embed
            src={pdfFile}
            type="application/pdf"
            width="100%"
            height="100%"
          />
        </div>
      </Modal>
      <div>
        <IconButton onClick={() => history.push("/employee")}>
          <ArrowBackIosIcon fontSize="small" />{" "}
        </IconButton>
        <h1>Employee ID: {values.employeeId}</h1>
        <Button
          Style="font-size:11px;"
          startIcon={<CloudDownloadIcon />}
          onClick={function () {
            if (values.securityChequeFile != null) {
              downloadFile(values.securityChequeFile);
            } else {
              alert("No Content");
            }
          }}
        >
          Security Cheque
        </Button>

        <Button
          startIcon={<CloudDownloadIcon />}
          Style="font-size:11px;"
          onClick={function () {
            if (values.guardianCnicFile != null) {
              downloadFile(values.guardianCnicFile);
            } else {
              alert("No Content");
            }
          }}
        >
          Guardian CNIC
        </Button>

        <Button
          startIcon={<CloudDownloadIcon />}
          Style="font-size:11px;"
          onClick={function () {
            if (values.employmentLetterFile != null) {
              downloadFile(values.employmentLetterFile);
            } else {
              alert("No Content");
            }
          }}
        >
          Employment Letter
        </Button>

        <Button
          startIcon={<CloudDownloadIcon />}
          Style="font-size:11px;"
          onClick={function () {
            if (values.cnicFile != null) {
              downloadFile(values.cnicFile);
            } else {
              alert("No Content");
            }
          }}
        >
          Cnic
        </Button>
        <List>
          <Grid container>
            <Grid item xs={6}>
              <ListItem> First Name: {values.firstName}</ListItem>
              <ListItem> Last Name : {values.lastName}</ListItem>
              <ListItem> Email : {values.email}</ListItem>
              <ListItem> Address : {values.address}</ListItem>
              <ListItem> Guardian Name : {values.guardianName}</ListItem>
              <ListItem>
                {" "}
                Guardian Relation : {values.guardianRelation}
              </ListItem>
              <ListItem> Gender : {values.gender}</ListItem>
              <ListItem> CNIC Number : {values.cnicnumber}</ListItem>
              <ListItem> Date Of Birth : {values.dateOfBirth}</ListItem>
              <ListItem> Phone Number : {values.phoneNumber}</ListItem>
              <ListItem> Mobile Number : {values.mobileNumber}</ListItem>
              <ListItem> Guardian Number : {values.guardianNumber}</ListItem>
            </Grid>

            <Grid item xs={6}>
              <ListItem> Emergency Number : {values.emergencyNumber}</ListItem>

              <ListItem> Employee NTN : {values.employeeNtn}</ListItem>
              <ListItem> Employee Code : {values.employeeCode}</ListItem>

              <ListItem> Company ID : {values.companyId}</ListItem>
              <ListItem> Branch ID : {values.branchId}</ListItem>
              <ListItem>
                {" "}
                BankAccount Number: {values.bankAccountNumber}
              </ListItem>
              <ListItem>
                {" "}
                Bank Account Title: {values.bankAccountTitle}
              </ListItem>
              <ListItem> Bank Name: {values.bankName}</ListItem>
              <ListItem> Active: {values.active}</ListItem>
              <ListItem> Entered By: {values.enteredBy}</ListItem>
              <ListItem>Entered On: {values.enteredOn}</ListItem>

              <Box></Box>
            </Grid>
          </Grid>
        </List>
      </div>{" "}
    </div>
  );
}
