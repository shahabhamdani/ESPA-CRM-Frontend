import HeaderComponent from "../Header/HeaderComponent";

import {
  Grid,
  makeStyles,
  Link,
  Paper,
  Avatar,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import auth from "../../auth";

import React, { useEffect } from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import api from "../Api/Api";
import { BrowserRouter } from "react-router-dom";
import reactDom from "react-dom";

export default function Login() {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 300,
    margin: "30px auto",
  };
  const avatarStyle = { backgroundColor: "#377dff" };
  const buttonStyle = {
    backgroundColor: "#377dff",
    color: "white",
    margin: "10px auto",
  };
  const textFieldStyle = { margin: "10px auto" };
  const forgotPassStyle = { color: "#377dff", align: "right" };

  let history = useHistory();

  const login = () => {
    alert("Login Success");
    auth.isAuthenticated(true);
  };

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      login();
    }
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    withoutLabel: {
      marginTop: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  const [values, setValues] = React.useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const request = {
    username: values.username,
    password: values.password,
  };

  function refreshPage() {
    window.location.reload(false);
  }

  const getUser = async () => {
    const result = await api.post("/login/", request);

    if (result.status == "200") {
      localStorage.setItem("user-info", JSON.stringify(result.data[0]));
      login();
      refreshPage();
    }
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>

            <h2>Sign in</h2>
          </Grid>

          <TextField
            required
            id="username"
            label="Username"
            defaultValue=""
            value={values.username}
            onChange={handleChange("username")}
            variant="outlined"
            fullWidth
            style={textFieldStyle}
          />

          <FormControl fullWidth>
            <InputLabel variant="outlined" htmlFor="outlined-password" required>
              Password
            </InputLabel>
            <OutlinedInput
              id="password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              labelWidth={70}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />

            <Button
              id="loginBtn"
              type="submit"
              variant="contained"
              style={buttonStyle}
              fullWidth
              onClick={getUser}
            >
              Log in
            </Button>
          </FormControl>

          <Typography>
            <Link href="#" style={forgotPassStyle}>
              Forgot Password ?
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
}
