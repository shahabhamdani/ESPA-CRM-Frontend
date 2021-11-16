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
import React from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

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
    password: "",
    showPassword: false,
  });

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
