import { handleLoading, getTickets, addTicket, getTicket, addComment, updateTicket } from "./ticketSlice";
import { ticketQuery, ticketsQuery, commentMutation, updateTicketQuery, addTicketQuery } from "./queries";
import { getToken, baseURL } from "../utils/sessions";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify"

export const fetchTickets = createAsyncThunk(
  "get/tickets",
  async (_, { dispatch, rejectWithValue }) => {
    const token = getToken();
    dispatch(handleLoading(true));

    try {
      const response = await fetch(`${baseURL}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ query: ticketsQuery }),
      });

      const data = await response.json();

      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      dispatch(getTickets(data.data.tickets));
      return data.data.tickets;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(handleLoading(false));
    }
  }
);

export const fetchTicket = createAsyncThunk(
  "get/ticket/id",
  async (id, { dispatch, rejectWithValue }) => {
    const token = getToken();
    dispatch(handleLoading(true));

    try {
      const response = await fetch(`${baseURL}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          query: ticketQuery,
          variables: { id },
        }),
      });

      const data = await response.json();

      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      dispatch(getTicket(data.data.ticket));
      return data.data.ticket;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(handleLoading(false));
    }
  }
);

export const createTicket = createAsyncThunk(
  "ticket/comment",
  async (newTicket, { dispatch, rejectWithValue }) => {
    const { title, complaint } = newTicket
    const token = getToken();

    // dispatch(handleLoading(true));

    try {
      const response = await fetch(`${baseURL}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          query: addTicketQuery,
          variables: { input: { title, complaint } },
        }),
      });
 
      const data = await response.json();

      if (data.errors) {
        const error = data.errors[0].message
        toast.error(error)
        throw new Error(error);
      }

      dispatch(addTicket(data.data.createTicket));
      toast.success("New supportTicket Created!")
      return data.data.createTicket;
    } catch (error) {
      return rejectWithValue(error.message);
    } 
  }
)

export const postTicketComment = createAsyncThunk(
  "ticket/comment",
  async (comment, { dispatch, rejectWithValue }) => {
    const { ticketId, content } = comment
    const token = getToken();

    try {
      const response = await fetch(`${baseURL}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          query: commentMutation,
          variables: { input: { ticketId, content } },
        }),
      });
 
      const data = await response.json();

      if (data.errors) {
        const error = data.errors[0].message
        toast.error(error)
        throw new Error(error);
      }

      dispatch(addComment(data.data.addComment));
      toast.success("Comment Added!")
      return data.data.addComment;
    } catch (error) {
      return rejectWithValue(error.message);
    } 
    // finally {
    //   dispatch(handleLoading(false));
    // }
  }
)

export const closeTicket = createAsyncThunk(
  "update/ticket",
  async (ticketUpdate, { dispatch, rejectWithValue }) => {
    const { ticketId, status } = ticketUpdate
    const token = getToken();

    dispatch(handleLoading(true));

    try {
      const response = await fetch(`${baseURL}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          query: updateTicketQuery,
          variables: { input: { ticketId, status } },
        }),
      });

      const data = await response.json();

      if (data.errors) {
        const error = data.errors[0].message
        toast.error(error)
        throw new Error(error)
      }

      dispatch(updateTicket(data.data.updateTicketStatus));
      toast.success("Ticked closed!")
      return data.data.updateTicketStatus;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(handleLoading(false));
    }
  }
)