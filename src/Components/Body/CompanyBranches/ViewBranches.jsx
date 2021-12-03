import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../Api/Api";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Button from "@mui/material/Button";
import { IconButton, List, ListItem } from "@material-ui/core";
import { useHistory } from "react-router";
import { PageHeader } from "../../Common/CommonComponent";


export default function ViewBranches() {
  let history = useHistory();
  const { id } = useParams();

  const initialFValues = {
    branchId: ""+{id},
    type: "",
    companyId: "",
    cityId: "",
    branchName: "",
    branchEmail: "",
    landLineNumber: "",
    customerSupport: "",
    whatsappNumber: "",
    geoLocation: "",
    countryId: "",
    provenceId: "",
    active: "",
  };
  const [values, setValues] = useState(initialFValues);

  
  const loadBranch = async () => {
    const result = await api.get("/branches/" + id);
    setValues(result.data);
  };
  useEffect(() => {
    loadBranch();
  }, []);

  return (
    <div>
      <IconButton onClick={() => history.push("/branches")}>
        <ArrowBackIosIcon fontSize="small" />{" "}
      </IconButton>
      <h1>Branch ID: {values.id}</h1>
      <List>
        <ListItem>Branch Name: {values.branchName}</ListItem>
        <ListItem>Branch Type: {values.type}</ListItem>
        <ListItem>Company ID: {values.companyId}</ListItem>
        <ListItem>City ID: {values.cityId}</ListItem>
        <ListItem>Branch Email: {values.branchEmail}</ListItem>
        <ListItem>LandLineNumber: {values.landLineNumber}</ListItem>
        <ListItem>Customer Support: {values.customerSupport}</ListItem>
        <ListItem>Whatsapp Number: {values.whatsappNumber}</ListItem>
        <ListItem>Geo Location: {values.geoLocation}</ListItem>{" "}
        <ListItem>CountryID: {values.countryId}</ListItem>
        <ListItem>ProvenceID: {values.provenceId}</ListItem>
        <ListItem>Active: {values.active}</ListItem>
      </List>
    </div>
  );
}
