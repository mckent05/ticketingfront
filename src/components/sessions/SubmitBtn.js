import React from "react";
import { Box, Button } from "@mui/material";

const Submit = ({ title, loading }) => {
  return (
    <Box
      sx={{
        width: "100%",
        mt: 3,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={loading}
        sx={{
          width: 160,
          height: 56,
          fontWeight: 700,
          fontSize: 16,
          fontFamily: "QuickSand, sans-serif",
          backgroundColor: "#f9a109",
          color: "#fff",
          borderRadius: 3,
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#fff",
            color: "#f9a109",
          },
        }}
      >
        {title}
      </Button>
    </Box>
  );
};

export default Submit;
