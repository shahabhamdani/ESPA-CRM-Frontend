import { FormControl, FormLabel, Grid, Paper, Radio } from "@material-ui/core";
import { RadioGroup, FormControlLabel, TextField } from "@material-ui/core";
import Button from "@mui/material/Button";

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { PageHeader } from "../../Common/CommonComponent";
import { useStyles } from "../BodyStyles";
import api from "../../Api/Api";
import base64 from "base-64";

export default function UpdateCompany() {
  const classes = useStyles();
  const { id } = useParams();

  const [file, setFile] = useState([]);

  const [imgRef, setImageRef] = useState();
  const [source, setSource] = useState();

  let history = useHistory();

  const initialFValues = {
    companyId: "" + { id },
    companyName: "",
    companyLogo: "",
    active: "N",
  };
  const [values, setValues] = useState(initialFValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const oneImageUpload = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setImageRef(URL.createObjectURL(file));
  };

  const [image, setImage] = useState([]);

  const request = {
    ...values,
  };

  const updateCompany = async () => {
    var formData = new FormData();
    var imageFile = file;

    request.companyLogo = "" + imageFile.name;

    formData.append("files", imageFile);
    formData.append("id", "" + "");

    api.post("/imageupload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const response = await api.put("/company/", request);
    alert("" + response.statusText);
    history.push("/company");
  };

  const loadCompany = async () => {
    const result = await api.get("/company/" + id);
    loadImage(result.data.companyLogo);
    setValues(result.data);
  };

  const loadImage = (img) => {
    api
      .get("/imageupload/" + img, { responseType: "blob" })
      .then(function (response) {
        var reader = new window.FileReader();
        reader.readAsDataURL(response.data);
        reader.onload = function () {
          var imageDataUrl = reader.result;
          setImageRef(imageDataUrl);
        };
      });
  };

  useEffect(() => {
    loadCompany();
  }, []);

  return (
    <div>
      <div>
        <PageHeader label="Company" pageTitle="Add Company" />

        <Paper className={classes.pageContent}>
          <form className={classes.formStye}>
            <Grid container>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  label="Company Name"
                  name="companyName"
                  onChange={handleInputChange}
                  value={values.companyName}
                ></TextField>

                <FormControl>
                  <FormLabel>Active</FormLabel>
                  <RadioGroup
                    row
                    name="active"
                    onChange={handleInputChange}
                    value={values.active}
                  >
                    <FormControlLabel
                      value="Y"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="N"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>

                  <Button variant="contained" onClick={updateCompany}>
                    Update
                  </Button>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <input
                  accept="image/*"
                  className={classes.uploadImage}
                  id="contained-button-file"
                  type="file"
                  onChange={oneImageUpload}
                />

                <div className={classes.imageUploadDiv}>
                  <img
                    alt=""
                    src={imgRef}
                    className={classes.companyCreateImage}
                  ></img>

                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      component="span"
                    >
                      Upload
                    </Button>
                  </label>
                </div>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    </div>
  );
}
