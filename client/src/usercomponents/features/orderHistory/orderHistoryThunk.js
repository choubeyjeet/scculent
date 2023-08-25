import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../../config/axiosInstance";

export const getOrderHistory = createAsyncThunk(
  "history/fetchAllOrdersHistory",
  async (data, rejectWithValue) => {
    try {
      const response = await axiosInstance.get("/api/v1/fetchAllOrders");
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
