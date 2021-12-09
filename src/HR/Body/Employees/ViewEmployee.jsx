import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../Api/Api";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Button from "@mui/material/Button";
import { IconButton, List, ListItem } from "@material-ui/core";
import { useHistory } from "react-router";
import { PageHeader } from "../../Common/CommonComponent";

const initialFValues = {
  employeeId: "",
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  employeeImage: "",
  guardianName: "",
  guardianRelation: "",
  gender: "",
  cnicnumber: "",
  geoLocation:"",
  dateOfBirth: "",
  phoneNumber: "",
  employeeCode: "",
  companyId: "",
  branchId: "",
  bankAccountNumber: "",
  customerSupport:"",
  landLineNumber:"",
  employeeNtn:"",
  whatsappNumber:"",
  bankAccountTitle: "",
  bankName: "",
  active: "",
  enteredBy: "",
  enteredOn: "" 
};

export default function ViewEmployee() {
  let history = useHistory();
  const [values, setValues] = useState(initialFValues);

  const loadEmployee = async () => {
    const result = await api.get("/employee/" + id);
    setValues(result.data);
  };
  const { id } = useParams();
  useEffect(() => {
    loadEmployee();
  }, []);

  return (
    <div>
      <div>
        <IconButton onClick={() => history.push("/employee")}>
          <ArrowBackIosIcon fontSize="small" />{" "}
        </IconButton>
        <h1>Employee ID: {values.employeeId}</h1>
        <List>
          <ListItem divider="true"> FirstName: {values.firstName}</ListItem>
          <ListItem divider="true"> LastName : {values.lastName}</ListItem>
          <ListItem divider="true"> Email : {values.email}</ListItem>
          <ListItem divider="true"> Address : {values.address}</ListItem>
          <ListItem divider="true">
            {" "}
            GuardianName : {values.guardianName}
          </ListItem>
          <ListItem divider="true">
            {" "}
            GuardianRelation : {values.guardianRelation}
          </ListItem>
          <ListItem divider="true"> Gender : {values.gender}</ListItem>
          <ListItem divider="true"> CNICNumber : {values.cnicnumber}</ListItem>
          <ListItem divider="true">
            {" "}
            DateOfBirth : {values.dateOfBirth}
          </ListItem>
          <ListItem divider="true">
            {" "}
            PhoneNumber : {values.phoneNumber}
          </ListItem>
          <ListItem divider="true">
            {" "}
            EmployeeCode : {values.employeeCode}
          </ListItem>
          <ListItem divider="true">
            {" "}
            EmployeeNTN : {values.employeeNtn}
          </ListItem>
          <ListItem divider="true"> CompanyID : {values.companyId}</ListItem>
          <ListItem divider="true"> BranchID : {values.branchId}</ListItem>
          <ListItem divider="true">
            {" "}
            BankAccountNumber: {values.bankAccountNumber}
          </ListItem>
          <ListItem divider="true">
            {" "}
            BankAccountTitle: {values.bankAccountTitle}
          </ListItem>
          <ListItem divider="true"> BankName: {values.bankName}</ListItem>
          <ListItem divider="true"> Active: {values.active}</ListItem>
          <ListItem divider="true"> EnteredBy: {values.enteredBy}</ListItem>
          <ListItem divider="true">EnteredOn: {values.enteredOn}</ListItem>
        </List>
      </div>{" "}
    </div>
  );
}
