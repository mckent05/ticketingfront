import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  tickets: [],
  ticket: {},
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    handleLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    getTickets: (state, action) => {
      state.tickets = action.payload.sort((a, b) => a.id - b.id);
    },
    getTicket: (state, action) => {
      state.ticket = { ...action.payload };
    },
    addComment: (state, action) => {
      if (state.ticket && Array.isArray(state.ticket.comments)) {
        if(state.ticket.status === "open") {
          state.ticket = {
            ...state.ticket,
            status: "in_progress"
          }
        }
        state.ticket.comments.push(action.payload);
      } else if (state.ticket) {
        state.ticket.comments = [action.payload];
      }
    },
    updateTicket: (state, action) => {
      const updatedTicket = action.payload;
      state.tickets = state.tickets.map((ticket) =>
        ticket.id === updatedTicket.id
          ? { ...ticket, status: updatedTicket.status }
          : ticket
      );
      state.ticket = updatedTicket;
    },
    addTicket: (state, action) => ({
     ...state,
     tickets: [...state.tickets, action.payload]
    }),
  },
});

export const {
  handleLoading,
  getTickets,
  getTicket,
  addTicket,
  addComment,
  updateTicket,
} = ticketSlice.actions;
export default ticketSlice.reducer;
