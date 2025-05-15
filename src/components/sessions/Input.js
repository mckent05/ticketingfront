import React from "react";
import { Box, TextField } from "@mui/material";

const Input = ({ ariaLabel, label, name, type, placeholder, handle }) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 500,
        mx: "auto",
        boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.04)",
        borderRadius: 2,
        backgroundColor: "#fff",
        px: 1,
        py: 1,
        border: "1px solid #f9a109",
      }}
    >
      <TextField
        fullWidth
        variant="standard"
        aria-label={ariaLabel}
        label={label}
        name={name}
        type={type}
        placeholder={placeholder}
        onInput={handle}
        InputProps={{
          disableUnderline: true,
          sx: {
            paddingY: 1,
            fontSize: "1rem",
          },
        }}
        InputLabelProps={{
          sx: { fontSize: "0.9rem", color: "#555" },
        }}
      />
    </Box>
  );
};

export default Input;
