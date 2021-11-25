import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../Api/Api";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Button from "@mui/material/Button";
import { IconButton, List, ListItem } from "@material-ui/core";
import { useHistory } from "react-router";
import { PageHeader } from "../../Common/CommonComponent";

const initialFValues = {
  id: "",
  FirstName: "",
  LastName: "",
  Email: "",
  Address: "",
  EmployeeImage: "",
  GuardianName: "",
  GuardianRelation: "",
  Gender: "",
  CNICNumber: "",
  DateOfBirth: "",
  PhoneNumber: "",
  EmployeeCode: "",
  EmployeeNTN: "",
  CompanyID: "",
  BranchID: "",
  BankAccountNumber: "",
  BankAccountTitle: "",
  BankName: "",
  Active: "",
  EmployeeImage: "",
  EnteredBy: "",
  EnteredOn: "",
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
        <h1>Employee ID: {values.id}</h1>
        <List>
          <ListItem divider="true"> FirstName: {values.FirstName}</ListItem>
          <ListItem divider="true"> LastName : {values.LastName}</ListItem>
          <ListItem divider="true"> Email : {values.Email}</ListItem>
          <ListItem divider="true"> Address : {values.Address}</ListItem>
          <ListItem divider="true">
            {" "}
            GuardianName : {values.GuardianName}
          </ListItem>
          <ListItem divider="true">
            {" "}
            GuardianRelation : {values.GuardianRelation}
          </ListItem>
          <ListItem divider="true"> Gender : {values.Gender}</ListItem>
          <ListItem divider="true"> CNICNumber : {values.CNICNumber}</ListItem>
          <ListItem divider="true">
            {" "}
            DateOfBirth : {values.DateOfBirth}
          </ListItem>
          <ListItem divider="true">
            {" "}
            PhoneNumber : {values.PhoneNumber}
          </ListItem>
          <ListItem divider="true">
            {" "}
            EmployeeCode : {values.EmployeeCode}
          </ListItem>
          <ListItem divider="true">
            {" "}
            EmployeeNTN : {values.EmployeeNTN}
          </ListItem>
          <ListItem divider="true"> CompanyID : {values.CompanyID}</ListItem>
          <ListItem divider="true"> BranchID : {values.BranchID}</ListItem>
          <ListItem divider="true">
            {" "}
            BankAccountNumber: {values.BankAccountNumber}
          </ListItem>
          <ListItem divider="true">
            {" "}
            BankAccountTitle: {values.BankAccountTitle}
          </ListItem>
          <ListItem divider="true"> BankName: {values.BankName}</ListItem>
          <ListItem divider="true"> Active: {values.Active}</ListItem>
          <ListItem divider="true"> EnteredBy: {values.EnteredBy}</ListItem>
          <ListItem divider="true">EnteredOn: {values.EnteredOn}</ListItem>
        </List>
      </div>{" "}
    </div>
  );
}
