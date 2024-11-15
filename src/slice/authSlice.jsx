// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../Components/Verification/AxiosConfig";
import { getToken, removeToken } from "../Components/Verification/TokenService";

// Async function to validate the token
export const validateToken = createAsyncThunk(
  "auth/validateToken",
  async (_, { dispatch }) => {
    const token = getToken();
    if (!token) return false;

    try {
      const response = await api.get("/user-data", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; // Return user data if token is valid
    } catch (error) {
      dispatch(logout()); // Remove token if validation fails
      return false;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null, // Holds user data
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user; // Set user data on login
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      removeToken(); // Clear token from cookies
    },
  },
  extraReducers: (builder) => {
    builder.addCase(validateToken.fulfilled, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = true;
        state.user = action.payload; // Store user data if token is valid
      } else {
        state.isAuthenticated = false;
        state.user = null;
      }
    });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
