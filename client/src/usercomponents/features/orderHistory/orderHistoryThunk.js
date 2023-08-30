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

export const downloadInvoice = createAsyncThunk(
  "order/downloadInvoice",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/v1/invoice?id=" + data.id);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
