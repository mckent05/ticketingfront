import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { handleSignIn } from "../../store/sessions/thunkCreators";
import Input from "./Input";
import Navigation from "./Navigation";
import Submit from "./SubmitBtn";
import Title from "./Title";

const LoginPage = ({ loading, signedIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const signIn = async (e) => {
    e.preventDefault();
    const result = await dispatch(handleSignIn(userDetails));
    if (handleSignIn.fulfilled.match(result)) {
      navigate("/");
    } else {
      console.error(result.payload);
    }
  };

  useEffect(() => {
    if (signedIn) {
      navigate("/");
    }
  }, [signedIn, navigate]);

  return (
    <Grid
      container
      sx={{ width: "100vw", minHeight: "100vh", backgroundColor: "#fff" }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          rowGap: 4,
          mt: 5,
          px: 2,
        }}
      >
        <Box>
          <Navigation
            text="Don't have an account yet?"
            push="register"
            btnText="Create an account"
          />
        </Box>

        <Box
          component="form"
          onSubmit={signIn}
          sx={{
            width: { xs: "90%", md: "55%" },
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Title text="Welcome!" />

          <Input
            ariaLabel="email"
            label="Email"
            name="email"
            type="text"
            handle={handleInput}
          />

          <Box sx={{ position: "relative" }}>
            <Input
              label="Password"
              ariaLabel="password"
              type="password"
              name="password"
              handle={handleInput}
            />
            <Typography
              variant="body2"
              sx={{
                position: "absolute",
                right: 10,
                bottom: "35%",
                color: "#f9a109",
                fontWeight: 600,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              Forgot?
            </Typography>
          </Box>

          <Submit title="Login" loading={loading} />
        </Box>
      </Box>
    </Grid>
  );
};

export default LoginPage;
