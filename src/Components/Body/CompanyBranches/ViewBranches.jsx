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
  Type: "",
  CompanyID: "",
  CityID: "",
  BranchName: "",
  BranchEmail: "",
  LandLineNumber: "",
  CustomerSupport: "",
  WhatsappNumber: "",
  GeoLocation: "",
  CountryID: "",
  ProvenceID: "",
  Active: "",
};

export default function ViewBranches() {
  let history = useHistory();
  const [values, setValues] = useState(initialFValues);

  const loadBranch = async () => {
    const result = await api.get("/branches/" + id);
    setValues(result.data);
  };
  const { id } = useParams();
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
        <ListItem>Branch Name: {values.BranchName}</ListItem>
        <ListItem>Branch Type: {values.Type}</ListItem>
        <ListItem>Company ID: {values.CompanyID}</ListItem>
        <ListItem>City ID: {values.CityID}</ListItem>
        <ListItem>Branch Email: {values.BranchEmail}</ListItem>
        <ListItem>LandLineNumber: {values.LandLineNumber}</ListItem>
        <ListItem>Customer Support: {values.CustomerSupport}</ListItem>
        <ListItem>Whatsapp Number: {values.WhatsappNumber}</ListItem>
        <ListItem>Geo Location: {values.GeoLocation}</ListItem>{" "}
        <ListItem>CountryID: {values.CountryID}</ListItem>
        <ListItem>ProvenceID: {values.ProvenceID}</ListItem>
        <ListItem>Active: {values.Active}</ListItem>
      </List>
    </div>
  );
}
