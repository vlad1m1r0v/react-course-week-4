import { createAsyncThunk } from "@reduxjs/toolkit";
import ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

const addComment = createAsyncThunk(
  ActionTypes.ADD_COMMENT,
  async (
    { dishId, rating, author, comment },
    { fulfillWithValue, rejectWithValue }
  ) => {
    const newComment = {
      dishId,
      rating,
      author,
      comment,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch(baseUrl + "comments", {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-type": "application/json",
        },
        credentials: "same-origin",
      });
      if (!response.ok) {
        return rejectWithValue(response.status);
      }
      const data = await response.json();
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data ?? error);
    }
  }
);

const loadComments = createAsyncThunk(
  ActionTypes.LOAD_COMMENTS,
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetch(baseUrl + "comments");
      if (!response.ok) {
        return rejectWithValue(response.status);
      }
      const data = await response.json();
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data ?? error);
    }
  }
);

const addFeedback = createAsyncThunk(
  ActionTypes.ADD_FEEDBACK,
  async (
    { firstname, lastname, telnum, email, agree, contactType, message },
    { fulfillWithValue, rejectWithValue }
  ) => {
    const newFeedback = {
      firstname,
      lastname,
      telnum,
      email,
      agree,
      contactType,
      message,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch(baseUrl + "feedback", {
        method: "POST",
        body: JSON.stringify(newFeedback),
        headers: {
          "Content-type": "application/json",
        },
        credentials: "same-origin",
      });
      if (!response.ok) {
        return rejectWithValue(response.status);
      }
      const data = await response.json();
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data ?? error);
    }
  }
);

const loadDishes = createAsyncThunk(
  ActionTypes.LOAD_DISHES,
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetch(baseUrl + "dishes");
      if (!response.ok) {
        return rejectWithValue(response.status);
      }
      const data = await response.json();
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data ?? error);
    }
  }
);

const loadPromos = createAsyncThunk(
  ActionTypes.LOAD_PROMOS,
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetch(baseUrl + "promotions");
      if (!response.ok) {
        return rejectWithValue(response.status);
      }
      const data = await response.json();
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data ?? error);
    }
  }
);

const loadLeaders = createAsyncThunk(
  ActionTypes.LOAD_LEADERS,
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetch(baseUrl + "leaders");
      if (!response.ok) {
        return rejectWithValue(response.status);
      }
      const data = await response.json();
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data ?? error);
    }
  }
);

export {
  loadComments,
  loadDishes,
  loadLeaders,
  loadPromos,
  addComment,
  addFeedback,
};
