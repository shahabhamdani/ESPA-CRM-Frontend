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
  companyName: "",
  companyLogo: "",
  active: "Y",
};

export default function ViewCompany() {
  let history = useHistory();
  const [values, setValues] = useState(initialFValues);
  const { id } = useParams();
  useEffect(() => {
    loadCompany();
  }, []);
  const loadCompany = async () => {
    const result = await api.get("/company/" + id);
    setValues(result.data);
  };

  return (
    <div>
      <IconButton onClick={() => history.push("/company")}>
        <ArrowBackIosIcon fontSize="small" />{" "}
      </IconButton>
      <h1>Company ID: {values.id}</h1>
      <List>
        <ListItem>Company Name: {values.companyName}</ListItem>
        <ListItem>Company Logo: {values.companyLogo}</ListItem>{" "}
        <ListItem>Active: {values.active}</ListItem>
      </List>
    </div>
  );
}
