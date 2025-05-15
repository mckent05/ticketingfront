import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { handleSignOut } from "../../store/sessions/thunkCreators";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  btnCont: {
    position: "relative",
    width: "100%",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    boxShadow: "3px 5px 20px rgba(0, 0, 0, 0.04)",
  },
  submitBtn: {
    backgroundColor: "#f9a109",
    borderRadius: 3,
    color: "#fff",
    fontSize: 16,
    fontWeight: 700,
    fontFamily: "QuickSand, sans-serif",
    transform: "translateX(-50%)",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#f9a109",
    },
  },
}));

const NavBar = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const signOut = async () => {
    const result = await dispatch(handleSignOut());
    if (handleSignOut.fulfilled.match(result)) {
      navigate("/login");
    } else {
      console.error(result.payload);
    }
  };
  const classes = useStyles();
  return (
    <nav className={classes.btnCont}>
      <h1>Customer Support Portal</h1>
      <h2>
        Logged in: {user.role === "agent" ? "Agent - " : "User - "}
        <span>{`${user.email ? user.email : ""}`}</span>
      </h2>
      <Button className={classes.submitBtn} onClick={signOut}>
        {" "}
        Logout{" "}
      </Button>
    </nav>
  );
};

export default NavBar;
