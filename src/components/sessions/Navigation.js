import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const Navigation = ({ text, push, btnText }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        rowGap: { xs: 1.5, lg: 0 },
        columnGap: { lg: 5 },
        width: "80%",
        margin: "10px auto",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "flex-end",
        minHeight: { lg: "10vh" },
      }}
    >
      <Typography
        sx={{
          fontFamily: "QuickSand, sans-serif",
          fontStyle: "normal",
          fontWeight: 400,
          fontSize: 17,
          color: "#b0b0b0",
        }}
      >
        {text}
      </Typography>
      <Button
        onClick={() => navigate(`/${push}`)}
        sx={{
          width: { xs: "80%", lg: "50%" },
          borderRadius: 2,
          py: { xs: 1, lg: 2 },
          mt: { xs: 2, lg: 0 },
          color: "#f9a109",
          backgroundColor: "#fff",
          fontFamily: "QuickSand, sans-serif",
          fontStyle: "normal",
          fontWeight: 600,
          fontSize: 18,
          boxShadow: "0px 2px 2px rgba(74, 106, 149, 0.2)",
          textTransform: "none",
        }}
      >
        {btnText}
      </Button>
    </Box>
  );
};

export default Navigation;
