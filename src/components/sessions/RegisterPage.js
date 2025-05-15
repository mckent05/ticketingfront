import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import Submit from "./SubmitBtn";
import Title from "./Title";

const RegisterPage = () => {
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
    <Grid
      container
      sx={{ flexDirection: "row", width: "100vw", minHeight: "100vh" }}
    >
      <Box
        sx={{
          width: { xs: "100%", lg: "60%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 4,
          py: 6,
          margin: "auto",
        }}
      >
        <Navigation
          text="Already have an account?"
          push="login"
          btnText="Login"
        />

        <Box
          component="form"
          onSubmit={handleRegister}
          sx={{
            width: "100%",
            maxWidth: 600,
            mt: 3,
            backgroundColor: "#fff",
          }}
        >
          <Title text="Create an account." />
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={6}>
              <Input
                label="First Name"
                name="firstName"
                type="text"
                handle={handleInput}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label="Last Name"
                name="lastName"
                type="text"
                handle={handleInput}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label="Username"
                name="username"
                type="text"
                handle={handleInput}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label="E-mail address"
                name="email"
                type="email"
                handle={handleInput}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                fullWidth
                type="password"
                inputProps={{ minLength: 6 }}
                name="password"
                onChange={handleInput}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!formErrorMessage.confirmPassword}>
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
          </Grid>

          <Box mt={2}>
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
          </Box>

          <Box mt={3}>
            <Submit title="Register" loading={isLoading} />
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default RegisterPage;
