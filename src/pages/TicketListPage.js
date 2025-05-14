import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/TicketList/Header";
import TicketsTable from "../components/TicketList/TicketsTable";
import { Fab, Box, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const TicketListPage = () => {
  const { tickets } = useSelector((state) => state.tickets);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Header role={user.role} />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={5}
        mb={5}
      >
        <TicketsTable tickets={tickets} role={user.role} />
      </Box>
      {user.role === "customer" && (
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => navigate("/new-ticket")}
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            backgroundColor: "#f9a109",
            "&:hover": {
              backgroundColor: "#e78f00",
            },
          }}
        >
          <AddIcon />
        </Fab>
      )}
    </Container>
  );
};

export default TicketListPage;
