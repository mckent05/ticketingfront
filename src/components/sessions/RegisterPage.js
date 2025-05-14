import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { handleSignUp } from "../../store/sessions/thunkCreators";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  FormControl,
  TextField,
  FormHelperText,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Input from "./Input";
import Navigation from "./Navigation";
import SideBanner from "./SideBanner";
import Submit from "./SubmitBtn";
import Title from "./Title";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: 0,
    position: "relative",
    width: "100vw",
    height: "auto",
    backgroundColor: "#fff",
    // [theme.breakpoints.up("lg")]: {
    //   flexDirection: "row",
    //   height: "100vh",
    // },
  },
  formCont: {
    width: "100%",
    height: "70vh",
    display: "flex",
    flexDirection: "column",
    marginTop: 5,
    rowGap: 20,
    // [theme.breakpoints.up("lg")]: {
    //   width: "58%",
    //   height: "95%",
    // },
  },
  form: {
    position: "relative",
    width: "90%",
    margin: "0 auto",
    // [theme.breakpoints.up("md")]: {
    //   width: "55%",
    //   padding: 15,
    // },
  },
  input: {
    position: "relative",
    width: "100%",
    marginBottom: 8,
    "& .MuiFilledInput-root": {
      backgroundColor: "#fff",
      color: "#000000",
    },
    // [theme.breakpoints.up("lg")]: {
    //   marginBottom: 15,
    // },
    "& .MuiFormLabel-root": {
      fontFamily: "QuickSand, sans-serif",
      fontStyle: "normal",
      fontWeight: 300,
      fontSize: 20,
    },
    "& .MuiTypography-root": {
      position: "absolute",
      right: 0,
      bottom: "35%",
      color: "#f9a109",
      fontFamily: "QuickSand, sans-serif",
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: 12,
    },
  },
}));

const RegisterPage = () => {
  const classes = useStyles();
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const sessionDetails = useSelector((state) => state.sessions);
  const { isLoading } = sessionDetails;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: 0,
  });

  const handleInput = (e) => {
    const { name, value, checked } = e.target;
    if (name === "role") {
      setUserDetails({ ...userDetails, role: checked ? 1 : 0 });
    } else {
      setUserDetails({ ...userDetails, [name]: value });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (userDetails.password !== userDetails.confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    const result = await dispatch(handleSignUp(userDetails));
    if (handleSignUp.fulfilled.match(result)) {
      navigate("/login");
    } else {
      console.error(result.payload);
    }
  };

  useEffect(() => {
    if (Object.keys(formErrorMessage).length) {
      const timer = setTimeout(() => {
        setFormErrorMessage({});
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formErrorMessage]);

  return (
    <Grid container className={classes.root}>
      <SideBanner />
      <Box className={classes.formCont}>
        <Navigation
          text="Already have an account?"
          push="login"
          btnText="Login"
        />
        <form onSubmit={handleRegister} className={classes.form}>
          <Title text="Create an account." />
          <Grid>
            <Input
              label="First Name"
              name="firstName"
              type="text"
              handle={handleInput}
            />
            <Input
              label="Last Name"
              name="lastName"
              type="text"
              handle={handleInput}
            />
            <Input
              label="Username"
              name="username"
              type="text"
              handle={handleInput}
            />
            <Input
              label="E-mail address"
              name="email"
              type="email"
              handle={handleInput}
            />
            <Grid>
              <FormControl
                className={classes.input}
                error={!!formErrorMessage.confirmPassword}
              >
                <TextField
                  label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  onChange={handleInput}
                  required
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl
                className={classes.input}
                error={!!formErrorMessage.confirmPassword}
              >
                <TextField
                  label="Confirm Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="confirmPassword"
                  onChange={handleInput}
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <FormControlLabel
              control={
                <Checkbox
                  checked={userDetails.role === 1}
                  onChange={handleInput}
                  name="role"
                  color="primary"
                />
              }
              label="Sign up as an agent?"
            />
            <Submit title="Register" loading={isLoading} />
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};

export default RegisterPage;
