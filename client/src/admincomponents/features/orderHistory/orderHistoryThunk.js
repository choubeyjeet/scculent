import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";

export const getOrderHistory = createAsyncThunk(
  "orders/ordersHistory",
  async (data, rejectWithValue) => {
    try {
      var response = await axiosInstance.get(
        `/api/v1/admin/orderHistory?type= + ${data.type}&page=${data.page}&perPage=${data.perPage}`
      );

      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getOrderById = createAsyncThunk(
  "orders/ordersHistory",
  async (data, rejectWithValue) => {
    try {
      var response = await axiosInstance.get(
        `/api/v1/admin/getOrderById?id=${data.id}`
      );

      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getOrderByDate = createAsyncThunk(
  "orders/ordersHistory",
  async (data, rejectWithValue) => {
    try {
      var response = await axiosInstance.get(
        `/api/v1/admin/getOrderByDate?id=${data.date}`
      );

      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const searchOrderByIdAdmin = createAsyncThunk(
  "orders/searchOrderById",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/admin/searchOrderById?id=${data}`
      );
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getDataByStatusAdmin = createAsyncThunk(
  "orders/getDataByStatus",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/admin/getDataByStatus?status=${data.status}`
      );
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
